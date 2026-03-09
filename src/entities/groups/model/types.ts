/**
 * [Frontend Type] 공통 기반 인터페이스
 */
interface BaseGroup {
  id: number;
  title: string;
  image: string;
  description: string;
  categoryLabel: string;
  location: string;
}

/**
 * [Frontend Type] 검색 및 둘러보기 모임 (GroupCard용)
 */
export interface Group extends BaseGroup {
  levelLabel: string;
  participants: {
    current: number;
    max: number;
    isFull: boolean;
  };
  like: {
    count: number;
    isLiked: boolean;
  };
  isRecruiting: boolean;
}

/**
 * [Frontend Type] 내가 가입한 모임 (JoinedGroupCard용)
 */
export interface JoinedGroup extends BaseGroup {
  levelLabel: string;
  myRole: 'LEADING' | 'MEMBER' | 'GUEST';
  unreadChatCount: number;
  participants: {
    current: number;
    max: number;
    isFull: boolean;
  };
  like: {
    count: number;
    isLiked: boolean;
  };
  lastMessage?: {
    content: string;
    createdAt: string;
  } | null;
  nextSchedule: {
    title: string;
    date: string;
  } | null;
}

/**
 * [Frontend Type] 모임 상세 정보 (상세 페이지용)
 */
export interface GroupDetail extends Group {
  myRole: 'LEADING' | 'MEMBER' | 'GUEST';
  unreadChatCount?: number;
  nextSchedule?: {
    title: string;
    date: string;
  } | null;
}

/**
 * [Frontend Type] 공지사항 데이터 구조
 */
export interface GroupNotice {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  isFixed: boolean;
  authorName: string;
}

/**
 * [Frontend Type] 랭킹 정보를 포함한 모임 데이터 구조
 */
export interface GroupRanking {
  id: number;
  title: string;
  rankingScore: number;
  rank: number;
  rankChange: string; // '+2', '-1', '0', 'NEW'
  imageUrl?: string;
  category?: string;
}
