import { Typography } from '@material-ui/core';
import BoxList from '../components/BoxList';
import { useBoxes } from '../contexts/BoxContext';

export default function BoxContent() {
  const { loading, boxes } = useBoxes();
  return (
    <>
      <Typography variant="h2" paragraph>
        Boxes
      </Typography>
      <BoxList boxes={boxes} />
    </>
  );
}
