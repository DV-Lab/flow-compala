export function getHeroImageUrl(playDataId) {
  const mediaType = "capture_Hero_Black";
  return `https://assets.laligagolazos.com/editions/${playDataId}/play_${playDataId}__${mediaType}_2880_2880_default.png`;
}

export function getFrontImageUrl(playDataId) {
  const mediaType = "capture_Front_Black";
  return `https://assets.laligagolazos.com/editions/${playDataId}/play_${playDataId}__${mediaType}_2880_2880_default.png`;
}

export function getLegalImageUrl(playDataId) {
  const mediaType = "capture_Legal_Black";
  return `https://assets.laligagolazos.com/editions/${playDataId}/play_${playDataId}__${mediaType}_2880_2880_default.png`;
}

export function getDetailsImageUrl(playDataId) {
  const mediaType = "capture_Details_Black";
  return `https://assets.laligagolazos.com/editions/${playDataId}/play_${playDataId}__${mediaType}_2880_2880_default.png`;
}

export function getPopupVideoUrl(playDataId) {
  const mediaType = "capture_Animated_Video_Popout_Black";
  return `https://assets.laligagolazos.com/editions/${playDataId}/play_${playDataId}__${mediaType}_1080_1080_default.mp4`;
}

export function getIdleVideoeUrl(playDataId) {
  const mediaType = "capture_Animated_Video_Idle_Black";
  return `https://assets.laligagolazos.com/editions/${playDataId}/play_${playDataId}__${mediaType}_1080_1080_default.mp4`;
}
