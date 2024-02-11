import type { CardProps as MuiCardProps } from '@mui/material/Card';
import MuiCard from '@mui/material/Card';
import { Breakpoint, styled } from '@mui/material/styles';

export type CardProps = MuiCardProps & StyleProps;

export const Card = (props: CardProps) => <StyledCard {...props} />;

interface StyleProps {
   maxWidth?: Breakpoint;
   noPadding?: boolean;
}

const StyledCard = styled(MuiCard, {
   shouldForwardProp: (prop) => prop !== 'noPadding' && prop !== 'maxWidth',
})<StyleProps>(({ maxWidth, noPadding, theme }) => ({
   padding: noPadding ? '0px !important' : theme.spacing(2),
   maxWidth: maxWidth ? theme.breakpoints.values[maxWidth] : '100%',
}));
