import { Typography } from '@material-ui/core';
import BoxList from '../components/BoxList';
import { useAuth } from '../contexts/AuthContext';
import { useBoxes } from '../contexts/BoxContext';

export default function BoxContent({ userOnly = false }) {
  const { boxes } = useBoxes();
  const { user } = useAuth();
  const filter = (b) => (userOnly ? b.created.by === user?._id : true);
  return (
    <>
      <Typography variant="h2" paragraph>
        Boxes
      </Typography>
      <BoxList boxes={boxes?.filter(filter)} />
    </>
  );
}
