export function getHeroImageUrl(playDataId: string | number) {
  const mediaType = "capture_Hero_Black";
  return `https://assets.laligagolazos.com/editions/${playDataId}/play_${playDataId}__${mediaType}_2880_2880_default.png`;
}

export function getFrontImageUrl(playDataId: string | number) {
  const mediaType = "capture_Front_Black";
  return `https://assets.laligagolazos.com/editions/${playDataId}/play_${playDataId}__${mediaType}_2880_2880_default.png`;
}

export function getLegalImageUrl(playDataId: string | number) {
  const mediaType = "capture_Legal_Black";
  return `https://assets.laligagolazos.com/editions/${playDataId}/play_${playDataId}__${mediaType}_2880_2880_default.png`;
}

export function getDetailsImageUrl(playDataId: string | number) {
  const mediaType = "capture_Details_Black";
  return `https://assets.laligagolazos.com/editions/${playDataId}/play_${playDataId}__${mediaType}_2880_2880_default.png`;
}

export function getPopupVideoUrl(playDataId: string | number) {
  const mediaType = "capture_Animated_Video_Popout_Black";
  return `https://assets.laligagolazos.com/editions/${playDataId}/play_${playDataId}__${mediaType}_1080_1080_default.mp4`;
}

export function getIdleVideoUrl(playDataId: string | number) {
  const mediaType = "capture_Animated_Video_Idle_Black";
  return `https://assets.laligagolazos.com/editions/${playDataId}/play_${playDataId}__${mediaType}_1080_1080_default.mp4`;
}
