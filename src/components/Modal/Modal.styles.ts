import styled from 'styled-components';

export const Modal = styled.div`
	position: absolute;
	top: 40%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: grid;
	place-items: center;
	z-index: 99;
	width: 100vw;
	height: 100vh;
`;
