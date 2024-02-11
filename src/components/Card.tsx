import type { CardProps as MuiCardProps } from '@mui/material/Card';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';

export type CardProps = MuiCardProps & StyleProps;

export const Card = (props: CardProps) => <StyledCard {...props} />;

interface StyleProps {
   noPadding?: boolean;
}

const StyledCard = styled(MuiCard, { shouldForwardProp: (prop) => prop !== 'noPadding' })<{
   noPadding?: boolean;
}>(({ noPadding, theme }) => ({
   padding: noPadding ? '0px !important' : theme.spacing(4),
}));
