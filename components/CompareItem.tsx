import Image from "next/image";

export const CompareItem: IComponent<{
  metadata: IPlayMetadata;
  media: IPlayMedia;
  edition: IPlayEdition;
}> = ({ metadata, media, edition }) => {
  const { PlayerFirstName, PlayerLastName } = metadata;
  const { tier, numMinted } = edition;
  return (
    <div className="bg-gradient-to-r from-orange-300 via-red-400 to-amber-100 p-[1px] rounded-lg overflow-hidden">
      <div className="bg-black back overflow-hidden rounded-lg h-full">
        <div className="flex flex-col items-center ">
          <div className="wrapper w-[480px] h-[480px] -translate-y-16">
            <Image
              src={media.heroImageUrl}
              alt={metadata.PlayerJerseyName}
              width="100%"
              height="100%"
              layout="responsive"
            />
          </div>
        </div>

        <div className="info -translate-y-36 p-2 flex flex-col justify-around items-start">
          <h1 className="text-2xl text-left">
            {PlayerFirstName} {PlayerLastName}
          </h1>
          <h3>#{tier.toLowerCase()}</h3>
          <span>
            Lowest ask:
            <h1>{numMinted}$</h1>
          </span>
        </div>
      </div>
    </div>
  );
};
