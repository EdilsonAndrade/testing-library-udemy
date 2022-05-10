interface Props {
  name: string;
  imagePath: string;
}
export const SundaeOptions = ({ name, imagePath }: Props) => (
  <div>
    <img alt={`${name} scoops`} src={imagePath} />
  </div>
);
