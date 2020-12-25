import {
  GET_BLOG,
  GET_BLOGS,
  BLOG_ERROR,
  ADD_COMMENT,
  COMMENT_ERROR,
  GET_COMMENT,
  ADD_BLOG,
} from "../actions/types";

const initialState = {
  blog: [],
  blogs: [],
  loading: true,
  comments: [],
  comment: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_BLOG:
      return {
        ...state,
        blog: payload,
        loading: false,
      };
    case GET_BLOGS:
      return {
        ...state,
        blogs: payload,
        loading: false,
      };
    case BLOG_ERROR:
      return {
        ...state,
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        // blogs: state.blogs.map(blog =>
        //   blog._id === payload.id
        //     ? blog.commentaire.push(payload.comment)
        //     : blog
        // ),
        comment: payload,
        loading: false,
      };

    case GET_COMMENT:
      return {
        ...state,
        comments: payload,
        loading: false,
      };
    case ADD_BLOG:
      return {
        ...state,
        blog: payload,
        loading: false,
      };
    default:
      return state;
  }
}
