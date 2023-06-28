import s from './DarkMode.module.css'
import moon from '../../assets/moon_32.png'
import sun from '../../assets/sun_32.png'
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../redux/actions'



const DarkMode = () => {

  const theme = useSelector((state) => state.darkMode)
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(actions.darkMode())
  }

  return (
    <div className={s.t}>
      <img src={sun} width="25px" alt="" className={s.iIcon} />
      <img src={moon} width="25px" alt="" className={s.tIcon} />


      <div className={s.tButton} onClick={handleClick} style={{ left: theme ? 0 : 25 }}>

      </div>
    </div>
  );
};

export default DarkMode;