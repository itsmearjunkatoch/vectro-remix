import { Table, Title } from '@mantine/core'
import {
	getAvatarForSalesRep,
	type Meetings,
	getMeetingAchor,
	getAllPositioning,
	type Positioning,
	getPositioningBySalesRepId,
	getPositioningByCustomerName,
} from '#app/utils/meetings/meetings.tsx'

type ReviewMomentsProps = {
	m: Meetings
	customer_name: string
	salesRepId: string
	fetchAll: boolean
	hideSellerName?: boolean
}

export default function PositioningTable({
	m,
	customer_name,
	salesRepId,
	fetchAll,
	hideSellerName = false,
}: ReviewMomentsProps) {
	let positionings: Positioning[] = []
	if (fetchAll) {
		console.log('fetching all')
		positionings = getAllPositioning(m)
	}
	if (salesRepId) {
		positionings = getPositioningBySalesRepId(m, salesRepId)
	} else if (customer_name) {
		positionings = getPositioningByCustomerName(m, customer_name)
	}

	let key = 0
	const rows = positionings.map(positioning => {
		key++
		return (
			<Table.Tr key={key}>
				{!hideSellerName && (
					<Table.Td>{getAvatarForSalesRep(positioning.salesRepId)}</Table.Td>
				)}
				<Table.Td>{positioning.description}</Table.Td>
				<Table.Td>{getMeetingAchor(m, positioning.meetingId)}</Table.Td>
			</Table.Tr>
		)
	})

	const widthClassName = hideSellerName ? 'w-fit' : 'w-[900px]'

	return (
		<div className="w-min">
			<Title order={3}>Company Positioning</Title>
			<Table.ScrollContainer minWidth={700}>
				<Table horizontalSpacing={10} layout="fixed" className={widthClassName}>
					<Table.Thead>
						<Table.Tr>
							{!hideSellerName && <Table.Th className="w-1/4">Name</Table.Th>}
							<Table.Th className={hideSellerName ? 'w-3/5' : 'w-2/5'}>
								Positioning
							</Table.Th>
							<Table.Th className="">Meeting Info</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			</Table.ScrollContainer>
		</div>
	)
}
