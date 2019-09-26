import { useContext } from 'react';
import RouterContext from 'src/context/RouterContext';

// see, https://github.com/ReactTraining/react-router/issues/6430
// watch, https://www.youtube.com/watch?v=3yiialslPbc
// note, custom hooks like this one are recommended to make mocking in tests easier
const useRouter = () => useContext(RouterContext);

export default useRouter;
