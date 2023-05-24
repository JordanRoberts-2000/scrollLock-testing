import CallToAction from './CallToAction'
import HamburgerMenu from './HamburgerMenu'

const Header = () => {
  return (
    <header className={`z-50 fixed flex top-0 w-full py-4 lg:py-2 lg:pt-4 items-center backdrop-blur-sm`}>
        {/* Hamburger Menu */}
        <HamburgerMenu/>
        <CallToAction/>
    </header>
  )
}

export default Header