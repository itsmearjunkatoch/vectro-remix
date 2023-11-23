import { Table, Title } from '@mantine/core'
import Lazy from 'lazy.js'
import {
	type Meetings,
	type Objection,
	getAllObjections,
} from '#app/utils/meetings/meetings.tsx'

type ObjectionsTableProps = {
	m: Meetings
	customer_name: string
	filteredCategory: string
	fetchAll: boolean
}

export default function ObjectionsTable({
	m,
	customer_name,
	filteredCategory,
	fetchAll,
}: ObjectionsTableProps) {
	let objections: Objection[] = []
	console.log('customer name = ', customer_name)
	if (fetchAll) {
		objections = getAllObjections(m)
	} else if (customer_name && customer_name !== 'All') {
		let meeting = m.find(m => m.companyName === customer_name)
		if (!meeting) {
			throw new Error(`Could not find meeting for customer ${customer_name}`)
		}
		objections = meeting.objections
	}

	let index = 0
	const rowsFilteredByCategory = Lazy(objections)
		.filter(objection => {
			if (filteredCategory === 'All' || !filteredCategory) {
				return true
			} else {
				return objection.category.toString() === filteredCategory
			}
		})
		.toArray()

	const rows = rowsFilteredByCategory.map(objection => {
		index++
		return (
			<Table.Tr key={index}>
				<Table.Td>{objection.prospect}</Table.Td>
				<Table.Td>{objection.category}</Table.Td>
				<Table.Td>{objection.description}</Table.Td>
				<Table.Td>{objection.timestamp}</Table.Td>
			</Table.Tr>
		)
	})

	return (
		<div className="wt-10 w-[900px]">
			<Title order={3}>Objections</Title>
			<Table.ScrollContainer minWidth={700} className="mt-5">
				<Table horizontalSpacing={10} layout="fixed" className="w-1/2">
					<Table.Thead>
						<Table.Tr>
							<Table.Th className="w-1/6">Prospect</Table.Th>
							<Table.Th className="w-1/6">Category</Table.Th>
							<Table.Th className="">Objection</Table.Th>
							<Table.Th className="w-1/6">Timestamp</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			</Table.ScrollContainer>
		</div>
	)
}
