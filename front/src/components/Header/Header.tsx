import { HFlow } from "bold-ui";
import Polvo from "./polvo.svg"
function Header() {
  return (
    <HFlow
    style={
      {
        backgroundColor: '#0069D0',
        height: '65px',
        width: '100%'
      }
     }
     alignItems='flex-start'
     >
      <img src={Polvo} alt='Polvinho'
      style = {
        {padding: '11px 40px',
      width: '42px'}
      }/>
      <h1
      style = {
        {color: 'white',
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: '36px',
        fontSize: '20px',
        fontFamily: 'IBM Plex Sans',
        display: 'inline',}
      }
      >Zé Polvinho</h1>
      </HFlow>
  );
}

export default Header