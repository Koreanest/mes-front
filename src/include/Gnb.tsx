import { Link, Outlet } from 'react-router-dom';

const Gnb = () => {
    return(
<>
      {/* Navigation */}
      <nav className='gnb'>
        <div className="gnb-wrap">
          <div className="gnb-scroll">
            <Link to="/" className='gnb-a a-active'>전체</Link>
            <Link to="/fortune" className='gnb-a'>개인운세</Link>
            <Link to="/romantic" className='gnb-a'>연애</Link>
            <Link to="/parting" className='gnb-a'>이별</Link>
            <Link to="/wealth" className='gnb-a'>재물</Link>
            <Link to="/job" className='gnb-a'>직업</Link>
            <Link to="/test" className='gnb-a'>시험</Link>
          </div>
        </div>
      </nav>
      <Outlet/>
</>
    );
}
export default Gnb;