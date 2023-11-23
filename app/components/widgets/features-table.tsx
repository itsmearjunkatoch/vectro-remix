import { Table, Title } from '@mantine/core'
import {
	getAvatarForSalesRep,
	type Meetings,
	getMeetingAchor,
	type FeaturePitched,
	getAllFeaturesPitched,
	getFeaturesPitchedBySalesRep,
	getFeaturesByCustomer,
} from '#app/utils/meetings/meetings.tsx'
import { addIdsToList } from '#app/utils/misc.tsx'

type ReviewMomentsProps = {
	m: Meetings
	customer_name: string
	salesRepId: string
	fetchAll: boolean
	hideSellerName?: boolean
}

export default function FeaturesTable({
	m,
	customer_name,
	salesRepId,
	fetchAll,
	hideSellerName = false,
}: ReviewMomentsProps) {
	let features: FeaturePitched[] = []
	if (fetchAll) {
		console.log('fetching all')
		features = getAllFeaturesPitched(m)
	}
	if (salesRepId) {
		features = getFeaturesPitchedBySalesRep(salesRepId, m)
	} else if (customer_name) {
		features = getFeaturesByCustomer(customer_name, m)
	}

	const rows = addIdsToList(features).map(feature => {
		return (
			<Table.Tr key={feature.uid}>
				{!hideSellerName && (
					<Table.Td>{getAvatarForSalesRep(feature.salesRep.id)}</Table.Td>
				)}
				<Table.Td>{feature.keyPoint}</Table.Td>
				<Table.Td>{getMeetingAchor(m, feature.meetingId)}</Table.Td>
			</Table.Tr>
		)
	})

	const widthClassName = hideSellerName ? 'w-fit' : 'w-[900px]'

	return (
		<div className="w-min">
			<Title order={3}>Features Pitched</Title>
			<Table.ScrollContainer minWidth={700}>
				<Table horizontalSpacing={10} layout="fixed" className={widthClassName}>
					<Table.Thead>
						<Table.Tr>
							{!hideSellerName && <Table.Th className="w-1/4">Name</Table.Th>}
							<Table.Th className={hideSellerName ? 'w-3/5' : 'w-2/5'}>
								Feature
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
