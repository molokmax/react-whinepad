import Logo from './Logo';
import './Header.css';

import Button from './Button';
import FormInput from './FormInput';

function Header({ onSearch, onAdd, count = 0 }) {
    const placeholder = count > 0 ? `Search ${count} items` : 'Search';

    return (
        <div className="Header">
            <Logo />
            <div>
                <FormInput placeholder={placeholder} onChange={onSearch} id="search" />
            </div>
            <Button onClick={onAdd}>
                <b>&#65291;</b> Add whine
            </Button>
        </div>
    )
}

export default Header;
