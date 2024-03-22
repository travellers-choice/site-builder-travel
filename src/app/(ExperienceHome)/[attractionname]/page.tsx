import DetailsPage from "./DetailsPage";

export default function AttractionName({
  params,
}: {
  params: { attractionname: string };
}) {
  const attractionname = params.attractionname;

  return <DetailsPage attractionname={attractionname} />;
}
