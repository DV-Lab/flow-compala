import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Tooltip,
  Typography,
} from "@material-tailwind/react";

export const CompareItem: IComponent<{
  image: string;
  name: string;
}> = ({ image, name }) => {
  return (
    <Card nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
      <CardHeader
        floated={false}
        className="h-80"
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
      >
        <img src={image} alt="profile-picture" />
      </CardHeader>
      <CardBody
        className="text-center"
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
      >
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {name}
        </Typography>
        <Typography color="blue" className="font-medium" textGradient>
          CEO / Co-Founder
        </Typography>
      </CardBody>
      <CardFooter
        className="flex justify-center gap-7 pt-2"
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
      >
        <Tooltip
          content="Like"
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
        >
          <Typography
            as="a"
            href="#facebook"
            variant="lead"
            color="blue"
            textGradient
          >
            <i className="fab fa-facebook" />
          </Typography>
        </Tooltip>
        <Tooltip
          content="Follow"
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
        >
          <Typography
            as="a"
            href="#twitter"
            variant="lead"
            color="light-blue"
            textGradient
          >
            <i className="fab fa-twitter" />
          </Typography>
        </Tooltip>
        <Tooltip
          content="Follow"
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
        >
          <Typography
            as="a"
            href="#instagram"
            variant="lead"
            color="purple"
            textGradient
          >
            <i className="fab fa-instagram" />
          </Typography>
        </Tooltip>
      </CardFooter>
    </Card>
  );
};
