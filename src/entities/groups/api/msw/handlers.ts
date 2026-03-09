import { http, HttpResponse } from 'msw';
import { GroupDetailDTO } from '../getGroupDetail';
import { RankingItemDTO } from '../getRanking';
import { NoticeDTO } from '../getNotices';

// 1. 가짜 데이터 정의 (서버 DTO 기준)
const mockGroups: GroupDetailDTO[] = [
  {
    clubId: 1,
    name: '주말 테니스 정기 모임',
    imageUrl:
      'https://images.unsplash.com/photo-1595435066359-628d54622998?q=80&w=600',
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
    imageUrl:
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=600',
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
    imageUrl:
      'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=600',
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
    imageUrl:
      'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=600',
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
  {
    clubId: 5,
    name: '신사동 맛집 탐방대',
    imageUrl:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600',
    description: '서울의 숨겨진 맛집을 찾아 떠납니다.',
    category: 'HOBBY',
    level: 'LOW',
    region: '서울 강남구',
    status: 'RECRUTING',
    curNumbers: 20,
    maxNumbers: 20,
    likes: 15,
    liked: false,
  },
  {
    clubId: 6,
    name: '주간 알고리즘 챌린지',
    imageUrl:
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=600',
    description: '매주 백준/프로그래머스 문제를 풀고 코드 리뷰를 진행합니다.',
    category: 'STUDY',
    level: 'MID',
    region: '온라인',
    status: 'RECRUTING',
    curNumbers: 12,
    maxNumbers: 50,
    likes: 56,
    liked: false,
  },
  {
    clubId: 7,
    name: '어쿠스틱 기타 합주',
    imageUrl:
      'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?q=80&w=600',
    description: '기타 연주를 즐기는 사람들의 편안한 합주 모임입니다.',
    category: 'CULTURE_ART',
    level: 'MID',
    region: '서울 성동구',
    status: 'RECRUTING',
    curNumbers: 3,
    maxNumbers: 8,
    likes: 24,
    liked: true,
  },
  {
    clubId: 8,
    name: '주말 자전거 라이딩',
    imageUrl:
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=600',
    description: '한강변을 따라 상쾌하게 달려요!',
    category: 'EXERCISE',
    level: 'LOW',
    region: '서울 광진구',
    status: 'RECRUTING',
    curNumbers: 8,
    maxNumbers: 15,
    likes: 31,
    liked: false,
  },
];

// 2. HTTP 핸들러 정의
export const groupHandlers = [
  // GET /api/groups/liked - 내가 좋아요 한 모임
  http.get('/api/groups/liked', () => {
    return HttpResponse.json({
      list: [
        {
          clubId: 2,
          name: '독서 토론: 현대 문학',
          imageUrl:
            'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=600',
          description: '매주 한 권의 책을 읽고 깊이 있게 토론해요.',
          category: 'STUDY',
          level: 'HIGH',
          region: '서울 마포구',
          status: 'RECRUTING',
          curNumbers: 4,
          maxNumbers: 10,
          likes: 12,
          liked: true,
        },
        {
          clubId: 7,
          name: '어쿠스틱 기타 합주',
          imageUrl:
            'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?q=80&w=600',
          description: '기타 연주를 즐기는 사람들의 편안한 합주 모임입니다.',
          category: 'CULTURE_ART',
          level: 'MID',
          region: '서울 성동구',
          status: 'RECRUTING',
          curNumbers: 3,
          maxNumbers: 8,
          likes: 24,
          liked: true,
        },
        {
          clubId: 4,
          name: 'TypeScript 마스터 클래스',
          imageUrl:
            'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=600',
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
      ],
    });
  }),

  // GET /api/groups/pending - 승인 대기중 모임
  http.get('/api/groups/pending', () => {
    return HttpResponse.json({
      list: [
        {
          clubId: 6,
          name: '주간 알고리즘 첼린지',
          imageUrl:
            'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=600',
          description:
            '매주 백준/프로그래머스 문제를 풀고 코드 리뷰를 진행합니다.',
          category: 'STUDY',
          level: 'MID',
          region: '온라인',
          status: 'RECRUTING',
          curNumbers: 12,
          maxNumbers: 50,
          likes: 56,
          liked: false,
        },
        {
          clubId: 5,
          name: '신사동 맛집 탐방대',
          imageUrl:
            'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600',
          description: '서울의 숨겨진 맛집을 찾아 떠납니다.',
          category: 'HOBBY',
          level: 'LOW',
          region: '서울 강남구',
          status: 'RECRUTING',
          curNumbers: 20,
          maxNumbers: 20,
          likes: 15,
          liked: false,
        },
      ],
    });
  }),

  // GET /api/groups/joined (가장 구체적인 경로를 처음에 배치)
  http.get('/api/groups/joined', () => {
    return HttpResponse.json({
      list: [
        {
          clubId: 1,
          name: '주말 테니스 정기 모임',
          imageUrl:
            'https://images.unsplash.com/photo-1595435066359-628d54622998?q=80&w=600',
          description: '테니스 초보부터 고수까지 모두 환영합니다!',
          category: 'EXERCISE',
          level: 'MID',
          region: '서울 강남구',
          status: 'RECRUTING',
          curNumbers: 8,
          maxNumbers: 20,
          likes: 5,
          liked: false,
          unreadChatCount: 3,
          nextSchedule: {
            title: '주말 야간 테니스 경기',
            date: '2024-06-01T20:00:00',
          },
          lastMessage: {
            content: '오늘 경기 정말 즐거웠습니다! 다들 수고 많으셨어요.',
            createdAt: '2024-05-25T14:30:00',
          },
        },
        {
          clubId: 2,
          name: '독서 토론: 현대 문학',
          imageUrl:
            'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=600',
          description: '매주 한 권의 책을 읽고 깊이 있게 토론해요.',
          category: 'STUDY',
          level: 'HIGH',
          region: '서울 마포구',
          status: 'RECRUTING',
          curNumbers: 4,
          maxNumbers: 10,
          likes: 12,
          liked: true,
          unreadChatCount: 12,
          nextSchedule: {
            title: '현대 문학 독서 스터디',
            date: '2024-05-30T19:00:00',
          },
          lastMessage: {
            content: '다음 주 읽어올 책 리스트 공유드립니다.',
            createdAt: '2024-05-26T10:15:00',
          },
        },
      ],
    });
  }),

  // GET /api/groups/ranking/hall-of-fame
  http.get('/api/groups/ranking/hall-of-fame', () => {
    return HttpResponse.json<RankingItemDTO[]>([
      {
        id: 1,
        title: '주말 테니스 정기 모임',
        rankingScore: 98.5,
        rank: 1,
        rankChange: '0',
        imageUrl:
          'https://images.unsplash.com/photo-1595435066359-628d54622998?q=80&w=600',
        category: '운동',
      },
      {
        id: 2,
        title: '개발자 네트워킹 데이',
        rankingScore: 94.2,
        rank: 2,
        rankChange: '+1',
        imageUrl:
          'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600',
        category: '프로젝트',
      },
      {
        id: 3,
        title: '현대 문학 독서 스터디',
        rankingScore: 91.8,
        rank: 3,
        rankChange: '-1',
        imageUrl:
          'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=600',
        category: '스터디',
      },
      {
        id: 4,
        title: '신사동 맛집 탐방대',
        rankingScore: 88.5,
        rank: 4,
        rankChange: 'NEW',
        imageUrl:
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600',
        category: '문화/예술',
      },
    ]);
  }),

  // GET /api/groups/ranking/weekly
  http.get('/api/groups/ranking/weekly', () => {
    return HttpResponse.json<RankingItemDTO[]>([
      {
        id: 5,
        title: '서울 야간 러닝 크루',
        rankingScore: 97.1,
        rank: 1,
        rankChange: 'NEW',
        imageUrl:
          'https://images.unsplash.com/photo-1532444458054-015fef927ca1?q=80&w=600',
        category: '운동',
      },
      {
        id: 1,
        title: '주말 테니스 정기 모임',
        rankingScore: 95.8,
        rank: 2,
        rankChange: '-1',
        imageUrl:
          'https://images.unsplash.com/photo-1595435066359-628d54622998?q=80&w=600',
        category: '운동',
      },
      {
        id: 6,
        title: '알고리즘 코딩 테스트 준비',
        rankingScore: 92.4,
        rank: 3,
        rankChange: '+2',
        imageUrl:
          'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=600',
        category: '스터디',
      },
    ]);
  }),

  // GET /api/groups REQUEST_HANDLER를 중간에 배치 (정적 경로들 이후)
  http.get('/api/groups', ({ request }) => {
    const url = new URL(request.url);
    const categoryQuery = url.searchParams.get('category');

    // 간단한 필터링 로직 추가 (선택 사항)
    let filteredList = [...mockGroups];
    if (categoryQuery && categoryQuery !== 'ALL') {
      filteredList = filteredList.filter(
        (group) => group.category === categoryQuery
      );
    }

    return HttpResponse.json({
      list: filteredList,
    });
  }),

  // GET /api/groups/:id 요청을 가장 나중에 배치 (범용 파라미터가 정적 경로를 덮어쓰지 않도록 함)
  http.get('/api/groups/:id', ({ params }) => {
    const { id } = params;
    const group = mockGroups.find((g) => g.clubId === Number(id));

    if (!group) {
      return HttpResponse.json(
        {
          isSuccess: false,
          code: 'GROUP4004',
          message: '존재하지 않는 모임입니다.',
          timestamp: new Date().toISOString(),
        },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      isSuccess: true,
      code: 'COMMON200',
      message: '요청이 성공했습니다.',
      result: group,
      timestamp: new Date().toISOString(),
    });
  }),

  // GET /api/groups/:id/notices
  http.get('/api/groups/:id/notices', ({ params }) => {
    const { id } = params;
    // 모든 모임에 대해 동일한 가짜 공지사항 반환 (테스트용)
    return HttpResponse.json({
      list: [
        {
          id: 101,
          title: '📢 이번 주 정기 모임 장소 변경 안내',
          content:
            '기존 강남역 테니스장에서 역삼역 테니스장으로 변경되었습니다. 착오 없으시기 바랍니다.',
          createdAt: '2024-03-20T10:00:00Z',
          isFixed: true,
          authorName: '테니스장인',
        },
        {
          id: 102,
          title: '새로운 멤버 환영회 공지',
          content:
            '신규 가입하신 분들을 위해 이번 주 금요일 저녁에 간단한 회식을 가질 예정입니다.',
          createdAt: '2024-03-15T15:30:00Z',
          isFixed: false,
          authorName: '테니스장인',
        },
        {
          id: 103,
          title: '운동 장비 공동 구매 수요 조사',
          content:
            '테니스 라켓 공동 구매를 진행할까 합니다. 관심 있으신 분들은 댓글 남겨주세요.',
          createdAt: '2024-03-10T09:00:00Z',
          isFixed: false,
          authorName: '테니스장인',
        },
      ],
    });
  }),

  // POST /api/groups/:id/like - 좋아요 토글
  http.post('/api/groups/:id/like', ({ params }) => {
    const { id } = params;
    const group = mockGroups.find((g) => g.clubId === Number(id));

    if (!group) {
      return HttpResponse.json(
        { message: '존재하지 않는 모임입니다.' },
        { status: 404 }
      );
    }

    // 상태 토글 (Mock)
    group.liked = !group.liked;
    group.likes = group.liked ? group.likes + 1 : group.likes - 1;

    return HttpResponse.json({
      isSuccess: true,
      code: 'COMMON200',
      message: '요청이 성공했습니다.',
      result: {
        clubId: group.clubId,
        liked: group.liked,
        likes: group.likes,
      },
      timestamp: new Date().toISOString(),
    });
  }),
];

export const activityHandlers = [
  // GET /api/users/me/posts - 내가 작성한 게시글
  http.get('/api/users/me/posts', () => {
    return HttpResponse.json({
      list: [
        {
          postId: 1,
          clubId: 1,
          clubName: '주말 테니스 정기 모임',
          title: '오늘 테니스 정말 즐거웠습니다!',
          content:
            '초보인데도 다들 친절하게 가르쳐주셔서 감사합니다. 다음 주에도 꼭 갈게요!',
          imageUrl:
            'https://images.unsplash.com/photo-1595435066359-628d54622998?q=80&w=600',
          commentCount: 5,
          likeCount: 12,
          createdAt: '2024-05-25T14:30:00Z',
        },
        {
          postId: 2,
          clubId: 2,
          clubName: '독서 토론: 현대 문학',
          title: '현대 문학 추천 도서 리스트 공유',
          content:
            '이번 주 스터디 때 언급되었던 작가들의 작품 목록입니다. 참고하세요.',
          imageUrl: null,
          commentCount: 8,
          likeCount: 24,
          createdAt: '2024-05-26T10:15:00Z',
        },
        {
          postId: 3,
          clubId: 4,
          clubName: 'TypeScript 마스터 클래스',
          title: 'FSD 아키텍처 도입 후기',
          content:
            '확실히 구조가 명확해지니까 협업하기 편하네요. 다들 어떻게 생각하시나요?',
          imageUrl: null,
          commentCount: 15,
          likeCount: 42,
          createdAt: '2024-05-27T09:00:00Z',
        },
      ],
    });
  }),

  // GET /api/users/me/comments - 내가 작성한 댓글
  http.get('/api/users/me/comments', () => {
    return HttpResponse.json({
      list: [
        {
          commentId: 1,
          clubId: 1,
          clubName: '주말 테니스 정기 모임',
          postId: 10,
          postTitle: '다음 주 모임 장소 공지',
          content: '확인했습니다! 정시에 맞춰 가겠습니다.',
          likeCount: 2,
          createdAt: '2024-05-24T18:00:00Z',
        },
        {
          commentId: 2,
          clubId: 2,
          clubName: '독서 토론: 현대 문학',
          postId: 11,
          postTitle: '이번 주 발제문 공유',
          content: '좋은 주제네요! 특히 세 번째 질문이 인상적입니다.',
          likeCount: 5,
          createdAt: '2024-05-25T11:20:00Z',
        },
        {
          commentId: 3,
          clubId: 1,
          clubName: '주말 테니스 정기 모임',
          postId: 12,
          postTitle: '라켓 추천 부탁드려요',
          content: '바볼랏 퓨어 에어로 추천드립니다! 초보자가 쓰기에도 좋아요.',
          likeCount: 8,
          createdAt: '2024-05-26T13:45:00Z',
        },
      ],
    });
  }),
];
