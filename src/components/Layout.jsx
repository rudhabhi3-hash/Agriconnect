import { Link } from 'react-router-dom';
import { Brand, DemoButton } from './Navbar';
import FPOCard from './FPOCard';
import { fpos } from '../data/fpos';
import { totalMatchedSupply } from '../utils/matching';

export function PageHead({ tag, title, children, demo }) { return <div className="head"><div><label>{tag}</label><h1>{title}</h1><p>{children}</p></div><DemoButton demo={demo} /></div>; }
export function FPOList() { return <section className="panel fpolist"><label>AI SUPPLY DISCOVERY</label><h2>FPO availability</h2>{fpos.map(fpo => <FPOCard key={fpo[0]} fpo={fpo} />)}<b className="matched">{totalMatchedSupply}</b><div className="bar"><i /></div></section>; }
export function Footer() { return <footer><div><Brand /><p>Connecting India’s Farms to India’s Demand.</p></div><div><b>AGROVISION · SIH 2026</b><p>Team Lead: Aditya Solanki · Mentor: Dr B Rajnarayan Prusty</p><p>Anirudh Mandal · Riya Singh · Vanshika Sehgal · Vansh Gupta · Tanishq Rawat</p></div></footer>; }
