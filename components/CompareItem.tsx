import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";

export const CompareItem: IComponent<{
  image: string;
  name: string;
  knownName: string;
}> = ({ image, name, knownName }) => {
  return (
    <div className="text-center flex flex-col gap-4">
      <div className="wrapper w-full h-full">
        <Image
          src={image}
          alt={name}
          width="100%"
          height="100%"
          layout="responsive"
        />
      </div>
      <h4>{name}</h4>
      <h4>{knownName}</h4>
    </div>
  );
};
