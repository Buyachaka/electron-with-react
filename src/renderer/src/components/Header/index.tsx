import React from 'react';
import {useNavigate} from 'react-router-dom';
import {HeaderContainer, NavigationHeader, BackButton} from './styles';

interface Props {
    title: string;
    showBackButton?: boolean;
}

const Header = ({title, showBackButton = true}: Props) => {
    const navigate = useNavigate();
    return (
        <HeaderContainer>
            <NavigationHeader>
                {showBackButton && (
                    <BackButton onClick={() => {
                        navigate(-1);
                    }}>
                        🔙
                    </BackButton>
                )}
                <h1>{title}</h1>
            </NavigationHeader>
        </HeaderContainer>
    );
};

export default Header;
