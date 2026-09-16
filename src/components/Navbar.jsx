import { Link, useNavigate } from 'react-router-dom';

export function Brand() { return <Link to="/" className="brand"><b>agri</b><strong>Connect</strong><small>by AgroVision</small></Link>; }
export function DemoButton({ demo }) { const navigate = useNavigate(); return <button className="demo" onClick={() => { demo(); navigate('/farmer'); }}>🎯 DEMO MODE</button>; }
export default function Navbar({ demo }) { return <header><Brand /><nav><Link to="/forecast">Forecast</Link><Link to="/reverse-mandi">Reverse Mandi</Link><Link to="/schemes">Schemes</Link><Link to="/impact">SIH Project</Link></nav><DemoButton demo={demo} /><Link className="avatar" to="/usertype">AS</Link></header>; }
