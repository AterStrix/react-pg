import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer',
  },
  flex: {
    display: 'flex',
    alignItems: 'baseline'
  }
}));

/* eslint-disable-next-line */
export interface HeaderProps {
  title: string;
  children: React.ReactElement;
}

export const Header = (props: HeaderProps) => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          className={classes.title}
        >
          { <div className={classes.flex}>
            { props.title }
            { props.children }
          </div> }
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
