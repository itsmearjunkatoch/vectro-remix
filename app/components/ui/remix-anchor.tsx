import { Anchor } from '@mantine/core'
import { Link } from '@remix-run/react'

type Props = {
	to: string
	children: React.ReactNode
}

function RemixAnchor({ to, children, ...props }: Props) {
	// Combines Remix's Link with Mantine's Anchor
	return (
		<Anchor component={Link} to={to} {...props}>
			{children}
		</Anchor>
	)
}

export default RemixAnchor
