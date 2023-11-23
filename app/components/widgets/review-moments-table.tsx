import { Table, Title, Anchor, Indicator } from '@mantine/core'
import {
	getAllreviewMoments,
	getAvatarForSalesRep,
	getreviewMomentsByCustomer,
	getreviewMomentsBySalesRep,
	getShortMeetingTitle,
	type Meetings,
	type ReviewMoment,
} from '#app/utils/meetings/meetings.tsx'
import { addIdsToList } from '#app/utils/misc.tsx'

type ReviewMomentsProps = {
	m: Meetings
	customer_name: string
	salesRepId: string
	fetchAll: boolean
}

function getTextColorFromStatus(status: string) {
	switch (status) {
		case 'Green':
			return 'text-green-600'
		case 'Red':
			return 'text-red-600'
		default:
			return 'text-yellow-600'
	}
}

export default function ReviewMomentsTable({
	m,
	customer_name,
	salesRepId,
	fetchAll,
}: ReviewMomentsProps) {
	let reviewMoments: ReviewMoment[] = []
	if (fetchAll) {
		reviewMoments = getAllreviewMoments(m)
	} else if (salesRepId) {
		reviewMoments = getreviewMomentsBySalesRep(salesRepId, m)
	} else if (customer_name) {
		reviewMoments = getreviewMomentsByCustomer(customer_name, m)
	}

	let greenMoments = reviewMoments.filter(
		reviewMoment => reviewMoment.status === 'Green',
	)
	let redMoments = reviewMoments.filter(
		reviewMoment => reviewMoment.status === 'Red',
	)
	let sortedMoments = redMoments.concat(greenMoments)

	const rows = addIdsToList(sortedMoments).map(reviewMoment => (
		<Table.Tr key={reviewMoment.uid}>
			<Table.Td>{getAvatarForSalesRep(reviewMoment.salesRep.id)}</Table.Td>
			{/* <Table.Td>{getMeetingAchor(m, reviewMoment.meetingId)}</Table.Td> */}
			<Table.Td>{getShortMeetingTitle(m, reviewMoment.meetingId)}</Table.Td>
			<Table.Td>
				<Anchor href={reviewMoment.link}>{reviewMoment.description}</Anchor>
			</Table.Td>
			<Table.Td className={getTextColorFromStatus(reviewMoment.status)}>
				<Indicator position="middle-center" color={reviewMoment.status} />
			</Table.Td>
		</Table.Tr>
	))

	return (
		<div className="w-[900px]">
			<Title order={3}>Review Moments</Title>
			<Table.ScrollContainer minWidth={700}>
				<Table horizontalSpacing={10} layout="fixed">
					<Table.Thead>
						<Table.Tr>
							<Table.Th className="w-1/4">Name</Table.Th>
							<Table.Th className="w-1/3">Meeting</Table.Th>
							<Table.Th>Description</Table.Th>
							<Table.Th className="w-16">Status</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			</Table.ScrollContainer>
		</div>
	)
}
