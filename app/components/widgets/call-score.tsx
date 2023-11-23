import { Table, Title, Drawer, Anchor } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'
import {
	type Meetings,
	getSalesRepById,
	getScoreTotal,
	type IndividualScore,
} from '#app/utils/meetings/meetings.tsx'

function getScoreTextOrHyperlink(
	score: IndividualScore,
	openFn: {
		(content: string): void
		(content: string): void
		(content: string): void
		(content: string): void
		(content: string): void
		(content: string): void
		(content: string): void
		(content: string): void
		bind?: any
	},
) {
	if (score.explaination) {
		let newFn = openFn.bind(null, score.explaination)
		return <Anchor onClick={newFn}>{score.score}</Anchor>
	} else {
		return score.score
	}
}

export default function ScoringTable({
	meetings,
	salesRepFilter,
}: {
	meetings: Meetings
	salesRepFilter?: string
}) {
	const [drawerContent, setDrawerContent] = useState('')
	const [opened, { open, close }] = useDisclosure(false)

	function openDrawerAndSetContent(content: string) {
		console.log('open drawer and set content')
		setDrawerContent(content)
		open()
	}

	let key = 0
	const filteredMeetings = meetings.filter(meeting => {
		if (salesRepFilter) {
			return meeting.salesReps[0].id === salesRepFilter
		}
		return true
	})
	const rows = filteredMeetings.map(meeting => {
		key++
		const callScore =
			meeting.callScores.length > 0 ? meeting.callScores[0] : null
		if (!callScore) {
			return null
		}
		const salesRep = getSalesRepById(callScore.salesRepId)

		return (
			<Table.Tr key={key}>
				<Table.Td>
					<div className="justify-left flex items-center gap-2">
						{meeting.companyName}
					</div>
				</Table.Td>
				<Table.Td className="text-center">{salesRep.name}</Table.Td>
				<Table.Td className="text-center">
					{getScoreTextOrHyperlink(callScore.intro, openDrawerAndSetContent)}
				</Table.Td>
				<Table.Td className="text-center">
					{getScoreTextOrHyperlink(
						callScore.callControl,
						openDrawerAndSetContent,
					)}
				</Table.Td>
				<Table.Td className="text-center">
					{getScoreTextOrHyperlink(
						callScore.qualificationRecap,
						openDrawerAndSetContent,
					)}
				</Table.Td>
				<Table.Td className="text-center">
					{getScoreTextOrHyperlink(
						callScore.discovery,
						openDrawerAndSetContent,
					)}
				</Table.Td>
				<Table.Td className="text-center">
					{getScoreTextOrHyperlink(
						callScore.championBuilding,
						openDrawerAndSetContent,
					)}
				</Table.Td>
				<Table.Td className="text-center">
					{getScoreTextOrHyperlink(
						callScore.businessCaseBuilding,
						openDrawerAndSetContent,
					)}
				</Table.Td>
				<Table.Td className="text-center">
					{getScoreTextOrHyperlink(
						callScore.objectionHandling,
						openDrawerAndSetContent,
					)}
				</Table.Td>
				<Table.Td className="text-center">
					{getScoreTextOrHyperlink(
						callScore.closingAbilities,
						openDrawerAndSetContent,
					)}
				</Table.Td>
				<Table.Td className="text-center">{getScoreTotal(callScore)}</Table.Td>
			</Table.Tr>
		)
	})

	return (
		<>
			<Title order={3}>Scorecard (AI Suggested)</Title>
			<Table.ScrollContainer minWidth={10}>
				<Table verticalSpacing="sm" layout="fixed" className="!w-fit">
					<Table.Thead>
						<Table.Tr>
							<TableHeader name={'Prospect'} />
							<TableHeader name={'Seller'} />
							<TableHeader name={'Intro'} />
							<TableHeader name={'Call Control'} />
							<TableHeader name={'Qualification Recap'} />
							<TableHeader name={'Discovery'} />
							<TableHeader name={'Champion Building'} />
							<TableHeader name={'Business Case Building'} />
							<TableHeader name={'Objection Handling'} />
							<TableHeader name={'Closing Abilities'} />
							<TableHeader name={'Total'} />
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			</Table.ScrollContainer>
			<Drawer opened={opened} onClose={close} title="Explaination">
				{drawerContent}
			</Drawer>
		</>
	)
}

interface TableHeaderProps {
	name: string
}

function TableHeader({ name }: TableHeaderProps) {
	return (
		<Table.Th>
			<div className="text-center">{name}</div>
		</Table.Th>
	)
}
