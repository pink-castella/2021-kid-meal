import styled from 'styled-components';


const Container = styled.div`
    height: 100vh;
    padding: 7rem calc((100vw - 1193px) / 2 + 1rem);
    @media screen and (max-width: 1193px) {
        padding: 7rem 1rem;
    }
    @media screen and (max-width:767px) {
        padding: 7rem 2rem;
    }
`;

const EllipsisText = styled.div`
    overflow: scroll;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* number of lines to show */
    -webkit-box-orient: vertical;
`;


export { Container, EllipsisText }