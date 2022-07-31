namespace youtubeDB{
  export interface auth0_userEntity {
    auth0_id: string;
    user_id: number;
  }
  export interface channelEntity {
    channel_id: number;
    channel_name: string;
    updated_at: Date;
    user_id: number;
  }
  export interface channel_subscriberEntity {
    subscribed_channel_id: number;
    subscriber_channel_id: number;
  }
  export interface commentEntity {
    channel_id: number;
    comment_id: number;
    content_text: string;
    created_at: Date;
    parent_comment_id: number | null;
    updated_at: Date;
  }
  export interface comment_dislikesEntity {
    channel_id: number;
    comment_id: number;
  }
  export interface comment_likesEntity {
    channel_id: number;
    comment_id: number;
  }
  export interface imageEntity {
    created_at: Date;
    image_id: number;
    source: string;
    updated_at: Date;
  }
  export interface postEntity {
    channel_id: number;
    content_text: string;
    created_at: Date;
    post_id: number;
    updated_at: Date;
  }
  export interface post_commentEntity {
    comment_id: number;
    post_id: number;
  }
  export interface post_dislikesEntity {
    channel_id: number;
    post_id: number;
  }
  export interface post_imageEntity {
    image_id: number;
    post_id: number;
  }
  export interface post_likesEntity {
    channel_id: number;
    post_id: number;
  }
  export interface videoEntity {
    channel_id: number;
    created_at: Date;
    description: string;
    source: string;
    updated_at: Date;
    video_id: number;
    video_type_id: number;
    views: any;
  }
  export interface video_commentEntity {
    comment_id: number;
    video_id: number;
  }
  export interface video_dislikesEntity {
    channel_id: number;
    video_id: number;
  }
  export interface video_likesEntity {
    channel_id: number;
    video_id: number;
  }
  export interface video_typeEntity {
    video_type_id: number;
    video_type_text: string;
  }
  export interface website_userEntity {
    created_at: Date;
    email: string;
    is_authorized: boolean;
    updated_at: Date;
    user_id: number;
    user_name: string;
  }
}