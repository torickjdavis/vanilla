import { Typography } from '@material-ui/core';
import BoxList from '../components/BoxList';

export default function BoxContent({ userOnly = false }) {
  return (
    <>
      <Typography variant="h2" paragraph>
        Boxes
      </Typography>
      <BoxList userOnly={userOnly} />
    </>
  );
}
