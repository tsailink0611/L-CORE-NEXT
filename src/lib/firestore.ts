import {
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  writeBatch
} from 'firebase/firestore'
import { db } from './firebase'

// User data types
export interface UserProfile {
  id: string
  email: string
  displayName?: string
  lineUserId?: string
  createdAt: Timestamp
  updatedAt: Timestamp
  settings: {
    language: 'ja' | 'en'
    timezone: string
    notifications: boolean
  }
}

// Message data types
export interface Message {
  id: string
  userId: string
  content: string
  type: 'text' | 'image' | 'video' | 'audio'
  status: 'draft' | 'scheduled' | 'sent' | 'failed'
  scheduledAt?: Timestamp
  sentAt?: Timestamp
  recipients: string[]
  analytics: {
    delivered: number
    read: number
    clicked: number
  }
  createdAt: Timestamp
  updatedAt: Timestamp
}

// Campaign data types
export interface Campaign {
  id: string
  userId: string
  name: string
  description?: string
  messages: string[]
  status: 'draft' | 'active' | 'paused' | 'completed'
  startDate: Timestamp
  endDate?: Timestamp
  targetAudience: {
    criteria: Record<string, any>
    estimatedReach: number
  }
  analytics: {
    totalSent: number
    totalDelivered: number
    totalRead: number
    totalClicked: number
    conversionRate: number
  }
  createdAt: Timestamp
  updatedAt: Timestamp
}

// User management functions
export const createUserProfile = async (userId: string, email: string, displayName?: string): Promise<void> => {
  const userRef = doc(db, 'users', userId)
  const userData: Omit<UserProfile, 'id'> = {
    email,
    displayName,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    settings: {
      language: 'ja',
      timezone: 'Asia/Tokyo',
      notifications: true
    }
  }

  await setDoc(userRef, userData)
}

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const userRef = doc(db, 'users', userId)
  const userSnap = await getDoc(userRef)

  if (userSnap.exists()) {
    return { id: userSnap.id, ...userSnap.data() } as UserProfile
  }
  return null
}

export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>): Promise<void> => {
  const userRef = doc(db, 'users', userId)
  await updateDoc(userRef, {
    ...updates,
    updatedAt: Timestamp.now()
  })
}

// Message management functions
export const createMessage = async (userId: string, messageData: Omit<Message, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  const messagesRef = collection(db, 'messages')
  const docRef = await addDoc(messagesRef, {
    ...messageData,
    userId,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  })
  return docRef.id
}

export const getUserMessages = async (userId: string, limitCount = 50): Promise<Message[]> => {
  const messagesRef = collection(db, 'messages')
  const q = query(
    messagesRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
    limit(limitCount)
  )

  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Message))
}

export const updateMessage = async (messageId: string, updates: Partial<Message>): Promise<void> => {
  const messageRef = doc(db, 'messages', messageId)
  await updateDoc(messageRef, {
    ...updates,
    updatedAt: Timestamp.now()
  })
}

export const deleteMessage = async (messageId: string): Promise<void> => {
  const messageRef = doc(db, 'messages', messageId)
  await deleteDoc(messageRef)
}

// Campaign management functions
export const createCampaign = async (userId: string, campaignData: Omit<Campaign, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  const campaignsRef = collection(db, 'campaigns')
  const docRef = await addDoc(campaignsRef, {
    ...campaignData,
    userId,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  })
  return docRef.id
}

export const getUserCampaigns = async (userId: string): Promise<Campaign[]> => {
  const campaignsRef = collection(db, 'campaigns')
  const q = query(
    campaignsRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  )

  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Campaign))
}

export const updateCampaign = async (campaignId: string, updates: Partial<Campaign>): Promise<void> => {
  const campaignRef = doc(db, 'campaigns', campaignId)
  await updateDoc(campaignRef, {
    ...updates,
    updatedAt: Timestamp.now()
  })
}

// Analytics functions
export const getUserAnalytics = async (userId: string) => {
  const messages = await getUserMessages(userId)
  const campaigns = await getUserCampaigns(userId)

  const totalMessages = messages.length
  const totalCampaigns = campaigns.length
  const totalSent = messages.filter(m => m.status === 'sent').length
  const totalDelivered = messages.reduce((sum, m) => sum + m.analytics.delivered, 0)
  const totalRead = messages.reduce((sum, m) => sum + m.analytics.read, 0)
  const totalClicked = messages.reduce((sum, m) => sum + m.analytics.clicked, 0)

  return {
    totalMessages,
    totalCampaigns,
    totalSent,
    totalDelivered,
    totalRead,
    totalClicked,
    readRate: totalDelivered > 0 ? (totalRead / totalDelivered) * 100 : 0,
    clickRate: totalRead > 0 ? (totalClicked / totalRead) * 100 : 0
  }
}

// Batch operations
export const batchCreateMessages = async (userId: string, messagesData: Omit<Message, 'id' | 'userId' | 'createdAt' | 'updatedAt'>[]): Promise<void> => {
  const batch = writeBatch(db)

  messagesData.forEach((messageData) => {
    const docRef = doc(collection(db, 'messages'))
    batch.set(docRef, {
      ...messageData,
      userId,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    })
  })

  await batch.commit()
}