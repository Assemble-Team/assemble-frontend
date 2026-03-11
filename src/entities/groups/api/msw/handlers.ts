import { http, HttpResponse } from 'msw';
import { GroupDetailDTO } from '../getGroupDetail';
import { RankingItemDTO } from '../getRanking';
import { NoticeDTO } from '../getNotices';
import { BoardPostDTO } from '../getBoardPosts';
import { GroupScheduleDTO } from '../getGroupSchedules';

// 헬퍼 함수: 데이터 복제 생성기
const createMockData = <T extends { clubId?: number; id?: number; name?: string; title?: string }>(
  base: T[],
  count: number,
  idKey: 'clubId' | 'id' = 'clubId'
): T[] => {
  return Array.from({ length: count }, (_, i) => {
    const item = base[i % base.length];
    const newId = i + 1;
    return {
      ...item,
      [idKey]: newId,
      name: item.name ? `${item.name} #${newId}` : undefined,
      title: item.title ? `${item.title} #${newId}` : undefined,
    };
  });
};

// 1. 가짜 데이터 정의 (서버 DTO 기준)
const baseGroups: GroupDetailDTO[] = [
  {
    clubId: 1,
    name: '주말 테니스 정기 모임',
    imageUrl: 'https://images.unsplash.com/photo-1595435066359-628d54622998?q=80&w=600',
    description: '테니스 초보부터 고수까지 모두 환영합니다!',
    category: 'EXERCISE',
    level: 'MID',
    region: '서울 강남구',
    status: 'RECRUTING',
    curNumbers: 8,
    maxNumbers: 20,
    likes: 5,
    liked: false,
    myRole: 'LEADING',
    unreadChatCount: 3,
  },
  {
    clubId: 2,
    name: '독서 토론: 현대 문학',
    imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=600',
    description: '매주 한 권의 책을 읽고 깊이 있게 토론해요.',
    category: 'STUDY',
    level: 'HIGH',
    region: '서울 마포구',
    status: 'RECRUTING',
    curNumbers: 4,
    maxNumbers: 10,
    likes: 12,
    liked: true,
    myRole: 'MEMBER',
    unreadChatCount: 0,
  },
  {
    clubId: 3,
    name: '퇴근 후 러닝 크루',
    imageUrl: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=600',
    description: '하루의 스트레스를 러닝으로 날려보내요!',
    category: 'EXERCISE',
    level: 'LOW',
    region: '서울 송파구',
    status: 'RECRUTING',
    curNumbers: 15,
    maxNumbers: 30,
    likes: 42,
    liked: false,
  },
  {
    clubId: 4,
    name: 'TypeScript 마스터 클래스',
    imageUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=600',
    description: '함께 타입스크립트의 깊은 곳을 탐험해봅시다.',
    category: 'PROJECT',
    level: 'HIGH',
    region: '온라인',
    status: 'RECRUTING',
    curNumbers: 5,
    maxNumbers: 12,
    likes: 88,
    liked: true,
  },
];

const mockGroups = createMockData(baseGroups, 30);

// 2. HTTP 핸들러 정의
export const groupHandlers = [
  // GET /api/groups/liked - 내가 좋아요 한 모임
  http.get('/api/groups/liked', () => {
    return HttpResponse.json({
      list: createMockData(baseGroups.filter(g => [2, 4].includes(g.clubId!)), 15),
    });
  }),

  // GET /api/groups/pending - 승인 대기중 모임
  http.get('/api/groups/pending', () => {
    return HttpResponse.json({
      list: createMockData(baseGroups.slice(0, 2), 12),
    });
  }),

  // GET /api/groups/joined
  http.get('/api/groups/joined', () => {
    return HttpResponse.json({
      list: createMockData(baseGroups.slice(0, 3), 15).map(g => ({
        ...g,
        unreadChatCount: Math.floor(Math.random() * 10),
        nextSchedule: { title: '정기 모임', date: '2024-06-01T20:00:00' },
        lastMessage: { content: '안녕하세요!', createdAt: new Date().toISOString() }
      })),
    });
  }),

  // GET /api/groups/ranking/hall-of-fame
  http.get('/api/groups/ranking/hall-of-fame', () => {
    const baseRank: RankingItemDTO[] = [
      { id: 1, title: '주말 테니스', rankingScore: 98.5, rank: 1, rankChange: '0', imageUrl: 'https://images.unsplash.com/photo-1595435066359-628d54622998?q=80&w=600', category: '운동' },
      { id: 2, title: '개발자 네트워킹', rankingScore: 94.2, rank: 2, rankChange: '+1', imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600', category: '프로젝트' },
    ];
    return HttpResponse.json<RankingItemDTO[]>(createMockData(baseRank, 20, 'id'));
  }),

  // GET /api/groups/ranking/weekly
  http.get('/api/groups/ranking/weekly', () => {
    const baseRank: RankingItemDTO[] = [
      { id: 5, title: '야간 러닝 크루', rankingScore: 97.1, rank: 1, rankChange: 'NEW', imageUrl: 'https://images.unsplash.com/photo-1532444458054-015fef927ca1?q=80&w=600', category: '운동' },
    ];
    return HttpResponse.json<RankingItemDTO[]>(createMockData(baseRank, 15, 'id'));
  }),

  // GET /api/groups
  http.get('/api/groups', ({ request }) => {
    const url = new URL(request.url);
    const categoryQuery = url.searchParams.get('category');
    let filteredList = [...mockGroups];
    if (categoryQuery && categoryQuery !== 'ALL') {
      filteredList = filteredList.filter((group) => group.category === categoryQuery);
    }
    return HttpResponse.json({ list: filteredList });
  }),

  // GET /api/groups/:id
  http.get('/api/groups/:id', ({ params }) => {
    const { id } = params;
    const group = mockGroups.find((g) => g.clubId === Number(id)) || mockGroups[0];
    return HttpResponse.json({ isSuccess: true, code: 'COMMON200', message: '성공', result: group });
  }),

  // GET /api/groups/:id/notices
  http.get('/api/groups/:id/notices', () => {
    const baseNotices: NoticeDTO[] = [
      { id: 101, title: '📢 공지사항입니다', content: '내용입니다.', createdAt: '2024-03-20T10:00:00Z', isFixed: true, authorName: '관리자' },
      { id: 102, title: '새소식 안내', content: '내용입니다.', createdAt: '2024-03-15T15:30:00Z', isFixed: false, authorName: '관리자' },
    ];
    return HttpResponse.json({ list: createMockData(baseNotices, 20, 'id') });
  }),

  // POST /api/groups/:id/like
  http.post('/api/groups/:id/like', ({ params }) => {
    const { id } = params;
    return HttpResponse.json({ isSuccess: true, code: 'COMMON200', message: '성공', result: { clubId: Number(id), liked: true, likes: 10 } });
  }),

  // GET /api/groups/:id/posts - 게시판 목록
  http.get('/api/groups/:id/posts', () => {
    const basePosts: BoardPostDTO[] = [
      {
        postId: 1,
        title: '오늘 모임 정말 즐거웠어요!',
        content: '다음에 또 봐요!',
        authorNickname: '테니스왕',
        authorProfileImageUrl: null,
        createdAt: '2024-03-20T18:00:00Z',
        commentCount: 5,
        likeCount: 12,
      },
      {
        postId: 2,
        title: '신입 회원 환영합니다!',
        content: '모두 반가워요.',
        authorNickname: '운영자',
        authorProfileImageUrl: null,
        createdAt: '2024-03-19T10:00:00Z',
        commentCount: 2,
        likeCount: 8,
      },
    ];
    return HttpResponse.json({
      isSuccess: true,
      code: 'COMMON200',
      message: '성공',
      result: createMockData(basePosts, 10, 'postId' as any),
    });
  }),

  // POST /api/groups/:id/posts - 게시글 작성
  http.post('/api/groups/:id/posts', async ({ request }) => {
    return HttpResponse.json({
      isSuccess: true,
      code: 'COMMON200',
      message: '게시글이 작성되었습니다.',
      result: { postId: Math.floor(Math.random() * 1000) },
    });
  }),

  // GET /api/groups/:id/schedules - 일정 목록
  http.get('/api/groups/:id/schedules', () => {
    const baseSchedules: GroupScheduleDTO[] = [
      {
        scheduleId: 1,
        title: '✨ 주말 정기 테니스 레슨',
        content: '프로 코치님과 함께하는 정기 레슨 시간입니다. 초보자 대환영!',
        date: '2024-03-25',
        time: '10:00',
        location: '올림픽공원 테니스 코트',
        maxParticipants: 8,
        curParticipants: 8, // 정원 초과 케이스 테스트용
        isJoined: true,
      },
      {
        scheduleId: 2,
        title: '🎾 퇴근 후 야간 매치',
        content: '조명 아래서 즐겁게 랠리해요. 실력 상관없이 즐기실 분!',
        date: '2024-03-27',
        time: '20:00',
        location: '반포 종합운동장 테니스장',
        maxParticipants: 4,
        curParticipants: 2,
        isJoined: false,
      },
      {
        scheduleId: 3,
        title: '☕️ 월간 정기 회식 및 친목 도모',
        content: '운동 후 맛있는 저녁과 함께 담소를 나눠요.',
        date: '2024-04-01',
        time: '19:00',
        location: '강남역 인근 고기집',
        maxParticipants: 20,
        curParticipants: 12,
        isJoined: false,
      },
    ];
    return HttpResponse.json({
      isSuccess: true,
      code: 'COMMON200',
      message: '성공',
      result: baseSchedules, // createMockData 대신 고정된 데이터로 테스트
    });
  }),

  // POST /api/groups/:id/schedules/:sid/join - 일정 참여
  http.post('/api/groups/:id/schedules/:sid/join', async () => {
    return HttpResponse.json({
      isSuccess: true,
      code: 'COMMON200',
      message: '일정에 참여하였습니다.',
      result: null,
    });
  }),

  // DELETE /api/groups/:id/schedules/:sid/join - 일정 참여 취소
  http.delete('/api/groups/:id/schedules/:sid/join', async () => {
    return HttpResponse.json({
      isSuccess: true,
      code: 'COMMON200',
      message: '일정 참여가 취소되었습니다.',
      result: null,
    });
  }),

  // POST /api/groups/:id/schedules - 일정 등록
  http.post('/api/groups/:id/schedules', async () => {
    return HttpResponse.json({
      isSuccess: true,
      code: 'COMMON200',
      message: '일정이 등록되었습니다.',
      result: { scheduleId: Math.floor(Math.random() * 1000) },
    });
  }),
];

export const activityHandlers = [
  // GET /api/users/me/posts
  http.get('/api/users/me/posts', () => {
    const basePosts = [
      { postId: 1, clubId: 1, clubName: '테니스 모임', title: '즐거운 테니스!', content: '내용입니다.', imageUrl: null, commentCount: 5, likeCount: 12, createdAt: '2024-05-25T14:30:00Z' },
    ];
    return HttpResponse.json({ list: createMockData(basePosts, 25, 'id' as any).map((p, i) => ({ ...p, postId: i + 1 })) });
  }),

  // GET /api/users/me/comments
  http.get('/api/users/me/comments', () => {
    const baseComments = [
      { commentId: 1, clubId: 1, clubName: '테니스 모임', postId: 10, postTitle: '공지사항', content: '확인했습니다!', likeCount: 2, createdAt: '2024-05-24T18:00:00Z' },
    ];
    return HttpResponse.json({ list: createMockData(baseComments, 30, 'id' as any).map((c, i) => ({ ...c, commentId: i + 1 })) });
  }),
];
