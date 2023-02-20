export function getHeroImageUrl(playDataId: any) {
  const mediaType = "capture_Hero_Black";
  return `https://assets.laligagolazos.com/editions/${playDataId}/play_${playDataId}__${mediaType}_2880_2880_default.png`;
}

export function getFrontImageUrl(playDataId: any) {
  const mediaType = "capture_Front_Black";
  return `https://assets.laligagolazos.com/editions/${playDataId}/play_${playDataId}__${mediaType}_2880_2880_default.png`;
}

export function getLegalImageUrl(playDataId: any) {
  const mediaType = "capture_Legal_Black";
  return `https://assets.laligagolazos.com/editions/${playDataId}/play_${playDataId}__${mediaType}_2880_2880_default.png`;
}

export function getDetailsImageUrl(playDataId: any) {
  const mediaType = "capture_Details_Black";
  return `https://assets.laligagolazos.com/editions/${playDataId}/play_${playDataId}__${mediaType}_2880_2880_default.png`;
}

export function getPopupVideoUrl(playDataId: any) {
  const mediaType = "capture_Animated_Video_Popout_Black";
  return `https://assets.laligagolazos.com/editions/${playDataId}/play_${playDataId}__${mediaType}_1080_1080_default.mp4`;
}

export function getIdleVideoUrl(playDataId: any) {
  const mediaType = "capture_Animated_Video_Idle_Black";
  return `https://assets.laligagolazos.com/editions/${playDataId}/play_${playDataId}__${mediaType}_1080_1080_default.mp4`;
}
