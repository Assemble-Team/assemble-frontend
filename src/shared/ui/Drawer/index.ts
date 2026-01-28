import DrawerRoot from './DrawerRoot';
import DrawerContent from './DrawerContent';
import DrawerHeader from './DrawerHeader';
import DrawerBody from './DrawerBody';

export const Drawer = Object.assign(DrawerRoot, {
  Content: DrawerContent,
  Header: DrawerHeader,
  Body: DrawerBody,
});
