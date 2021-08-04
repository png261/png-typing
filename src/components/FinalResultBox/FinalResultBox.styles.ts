import styled from 'styled-components';
import FinalResultForm from 'src/assets/images/FinalResultForm.svg';

export const Wrapper = styled.div`
	border-radius: 0.3rem;
	transition: all 0.5s;
	background: no-repeat url(${FinalResultForm});
	background-size: contain;
	width: 320px;
	height: 493px;
	position: relative;
	& > div {
		position: absolute;
		width: 100%;
		font-style: italic;
		text-align: right;
		padding: 0 3rem;
		color: #282828;
	}
`;

export const SiteName = styled.div`
	top: 2rem;
	font-size: 30px;
	font-weight: bold;
	font-style: normal;
	width: 100%;
`;

export const CurrentDate = styled.div`
	top: 9.7rem;
	padding: 0 2.7rem !important;
	font-size: 1.4rem;
`;
export const DeviceOS = styled.div`
	top: 12.7rem;
	font-size: 2.4rem;
`;
export const Mode = styled.div`
	top: 19rem;
	font-size: 1.4rem;
`;
export const MaxSpeed = styled.div`
	top: 21.5rem;
	font-size: 3rem;
`;
export const AvgSpeed = styled.div`
	top: 26.2rem;
	font-size: 3rem;
`;

export const AvgAcc = styled.div`
	top: 30.7rem;
	font-size: 3rem;
`;
export const Stemp = styled.div`
	top: 32.7rem;
	width: 100%;
	height: 11.2rem;
	background-size: contain;
	background-repeat: no-repeat;
`;
export const StempDay = styled.div`
	position: absolute;
	font-family: 'Fjalla One', sans-serif;
	font-weight: normal;
	color: #4f0b99;
`;
