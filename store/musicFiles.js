export const state = () => ({
  musicFileData: [],
  // clickedFileUserId: '',
  // clickedLoginUserId: '',
  followedId:'',
  userId:'',
  commentInfos:''
})

export const getters = {
  musicFileData: state => state.musicFileData,
  // clickedFileUserId: state => state.clickedFileUserId,
  // clickedLoginUserId: state => state.clickedLoginUserId,
  followedId: (state) => state.followedId,
  userId: (state) => state.userId,
  commentInfos: (state) => state.commentInfos
}

export const mutations = {
  setMusicFileDataMutations(state, musicFileData) {
    // console.log(musicFileData)
    // console.log(state.musicFileData)
    state.musicFileData = musicFileData
  },
  setMusicDetailPageData (state, { followedId, userId, commentInfos }) {
    state.followedId = followedId
    state.userId = userId
    state.commentInfos = commentInfos
  }
  // setFileUserId(state, clickedFileUserId) {
  //   // console.log(state.clickedFileUserId)
  //   state.clickedFileUserId = clickedFileUserId
  // },
  // setLoginUserId(state, clickedLoginUserId) {
  //   console.log(state.clickedLoginUserId)
  //   state.clickedLoginUserId = clickedLoginUserId
  // },
}

export const actions = {
  setMusicFileData(context, payload) {
    const musicFiledatum = {
      clickedFileTitle: payload.clickedFileTitle,
      clickedFileCoverImage: payload.clickedFileCoverImage,
      clickedFileMusicfile: payload.clickedFileMusicfile,
      clickedFileUserName: payload.clickedFileUserName,
      clickedFileUserId: payload.clickedFileUserId,
      clickedFileId: payload.clickedFileId,
    }
    const musicFileData = [];
    musicFileData.push(musicFiledatum)
    context.commit('setMusicFileDataMutations', musicFileData)
  },
  // follow(context, payload) {
  //   context.commit('setFileUserId', payload.clickedFileUserId)
  //   context.commit('setLoginUserId', payload.clickedLoginUserId)
  // },
  async musicDetailPageData(context, payload) {
    await this.$axios.$get(`api/${payload.clickedLoginUserId}/${payload.clickedFileId}/${payload.clickedFileUserId}/musicDetailPageData`)
    .then(response => {
      const musicDetailPageData = response
      // フォロー
      let followedId = ''
      const id = payload.clickedFileUserId
      const followedIdCheck = musicDetailPageData.musicDetailPageData.some((v) => v.followed_id === id);
        if (followedIdCheck) {
          followedId = musicDetailPageData.musicDetailPageData[0].followed_id
          console.log('follow ifだよ')
        } else {
          followedId = false
          console.log('follow elseだよ')
        }
      // いいね
      let userId = ''
      const likeId = payload.clickedLoginUserId
      const userIdCheck = musicDetailPageData.musicDetailPageData.some((v) => v.user_id === likeId);
        if (userIdCheck) {
          userId = musicDetailPageData.musicDetailPageData[0].user_id
          console.log('like ifだよ')
        } else {
          userId = false
          console.log('like elseだよ')
        }
        // コメント
        let commentInfos = musicDetailPageData.musicDetailPageData
        // const textCheck = musicDetailPageData.musicDetailPageData.some((v) => v.tex);
        // if (textCheck) {
        //   commentInfos = musicDetailPageData.musicDetailPageData
        // } else {
        //   commentInfos = false
        // }
        // console.log(musicDetailPageData.musicDetailPageData.some((v) => v.tex))
        context.commit('setMusicDetailPageData', { followedId: followedId, userId: userId, commentInfos: commentInfos })
    })
  },
}