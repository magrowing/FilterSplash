export interface CardDTO {
  alt_description: string
  blur_hash: string
  breadcrumbs: []
  color: string
  created_at: string
  current_user_collections: []
  description: string
  height: number
  id: string
  liked_by_user: boolean
  likes: number
  links: Link
  promoted_at: null
  slug: string
  sponsorship: null
  tags: Tag[]
  topic_submissions: any
  updated_at: string
  urls: Url
  user: any
  width: number
}

export interface ImageData {
  results : CardDTO[]
  total : number 
  total_pages:number
}

interface Link {
  download: string
  download_location: string
  html: string
  self: string
}

interface Tag {
  source: {
      ancestry: any
      cover_photo: any
      description: string
      meta_description: string
      meta_title: string
      subtitle: string
      title: string
  }
  title: string
  type: string
}

interface Url {
  full: string
  raw: string
  regular: string
  small: string
  small_s3: string
  thumb: string
}



export const initialCardDTO: CardDTO = {
  alt_description: '',
  blur_hash: '',
  breadcrumbs: [],
  color: '#000000', // 예시로 헥스 코드를 사용
  created_at: new Date().toISOString(),
  current_user_collections: [],
  description: '',
  height: 0,
  id: '',
  liked_by_user: false,
  likes: 0,
  links: {
    self: '',
    html: '',
    download: '',
    download_location: ''
  },
  promoted_at: null,
  slug: '',
  sponsorship: null,
  tags: [],
  topic_submissions: {},
  updated_at: new Date().toISOString(),
  urls: {
    raw: '',
    full: '',
    regular: '',
    small: '',
    small_s3 : '',
    thumb: ''
  },
  user: {},
  width: 0
};

export const initImageData : ImageData= {
  results : [],
  total : 0,
  total_pages:0,
}

export type BookmarkData = {
  id: string;
  authorName: string;
  describe: string;
  image: string; 
}