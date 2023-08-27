import {useSelector, useDispatch} from 'react-redux'
import { ordered, restocked } from './cakeSlice';


const CakeView = () => {
  const dispatch = useDispatch();
  const numOfCakes = useSelector(state => state.cake.numOfCakes)

  return (
    <div>
      <h2>Number of Cakes - {numOfCakes}</h2>
      <button onClick={()=> dispatch(ordered())}>Order cake</button>
      <button onClick={()=> dispatch(restocked(3))}>Restock cakes</button>
    </div>
  );
};

export default CakeView;
