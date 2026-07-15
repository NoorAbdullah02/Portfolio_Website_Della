export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <span>© {new Date().getFullYear()} Mursheda Nusrat Della. All rights reserved.</span>
        <span className="footer__built">Built with React, Express &amp; PostgreSQL.</span>
      </div>
    </footer>
  )
}
