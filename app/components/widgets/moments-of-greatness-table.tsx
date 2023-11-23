import { Table, Title, Anchor } from '@mantine/core'
import {
	getAvatarForSalesRep,
	type MomentOfGreatness,
	type Meetings,
	getMomentOfGreatnessByCustomer,
	getMomentOfGreatnessPitchedBySalesRep,
	getAllMomentsOfGreatness,
	getShortMeetingTitle,
} from '#app/utils/meetings/meetings.tsx'
import { addIdsToList } from '#app/utils/misc.tsx'

type ReviewMomentsProps = {
	m: Meetings
	customer_name: string
	salesRepId: string
	fetchAll: boolean
}

export default function MomentOfGreatness({
	m,
	customer_name,
	salesRepId,
	fetchAll,
}: ReviewMomentsProps) {
	let momentsOfGreatness: MomentOfGreatness[] = []
	if (fetchAll) {
		momentsOfGreatness = getAllMomentsOfGreatness(m)
	}
	if (salesRepId) {
		momentsOfGreatness = getMomentOfGreatnessPitchedBySalesRep(salesRepId, m)
	} else if (customer_name) {
		momentsOfGreatness = getMomentOfGreatnessByCustomer(customer_name, m)
	}

	const rows = addIdsToList(momentsOfGreatness).map(moment => {
		return (
			<Table.Tr key={moment.uid}>
				<Table.Td>{getAvatarForSalesRep(moment.salesRep.id)}</Table.Td>
				{/* <Table.Td>{getMeetingAchor(m, moment.meetingId)}</Table.Td> */}
				<Table.Td>{getShortMeetingTitle(m, moment.meetingId)}</Table.Td>
				<Table.Td>
					<Anchor href={moment.link}>{moment.description}</Anchor>
				</Table.Td>
			</Table.Tr>
		)
	})

	return (
		<div className="w-[900px]">
			<Title order={3}>Moments of Greatness</Title>
			<Table.ScrollContainer minWidth={700}>
				<Table horizontalSpacing={10} layout="fixed" className="w-1/2">
					<Table.Thead>
						<Table.Tr>
							<Table.Th className="w-1/3">Name</Table.Th>
							<Table.Th className="">Meeting</Table.Th>
							<Table.Th>Description</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			</Table.ScrollContainer>
		</div>
	)
}
