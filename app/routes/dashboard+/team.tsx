import { Tabs, Select, Divider } from '@mantine/core'
import { type DataFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useState } from 'react'
import ScoringTable from '#app/components/widgets/call-score.tsx'
import FeaturesTable from '#app/components/widgets/features-table.tsx'
import MomentOfGreatness from '#app/components/widgets/moments-of-greatness-table.tsx'
import PositioningTable from '#app/components/widgets/positioning-table.tsx'
import ReviewMoments from '#app/components/widgets/review-moments-table.tsx'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import {
	getAllSalesReps,
	getMeetingData,
} from '#app/utils/meetings/meetings.tsx'

export async function loader({ params, request }: DataFunctionArgs) {
	const userId = await requireUserId(request)
	const user = prisma.user.findUniqueOrThrow({
		select: {
			id: true,
			name: true,
			username: true,
			image: { select: { id: true } },
			roles: {
				select: {
					name: true,
					permissions: {
						select: { entity: true, action: true, access: true },
					},
				},
			},
		},
		where: { id: userId },
	})
	const salesReps = getAllSalesReps()
	const meetings = getMeetingData()
	return {
		user: user,
		meetings: meetings,
		salesReps: salesReps,
	}
}

export default function V2Dashboard() {
	const [selectedSalesRepName, setValue] = useState('')
	const { user, meetings, salesReps } = useLoaderData<typeof loader>()
	if (!selectedSalesRepName) {
		setValue(salesReps[0].name)
	}
	const salesRep = salesReps.find(rep => rep.name === selectedSalesRepName)
	console.log('data = ', user)
	return (
		<>
			<div className="flex basis-10 justify-end gap-10 space-x-40 space-y-40">
				<div className="mx-auto flex flex-col gap-4">
					<h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
						Team Dashboard
					</h1>
					<Select
						label="Sales Person"
						placeholder="Pick value"
						data={salesReps.map(rep => rep.name).concat('All')}
						defaultValue={salesReps[0].name}
						className="w-fit"
						value={selectedSalesRepName}
						onChange={value => setValue(value ?? '')}
					/>
					<ReviewMoments
						m={meetings}
						customer_name=""
						salesRepId={salesRep?.id ?? ''}
						fetchAll={selectedSalesRepName === 'All'}
					/>
					<MomentOfGreatness
						m={meetings}
						customer_name=""
						salesRepId={salesRep?.id ?? ''}
						fetchAll={selectedSalesRepName === 'All'}
					/>
					<ScoringTable meetings={meetings} salesRepFilter={salesRep?.id} />

					<Divider
						my="xl"
						label="Talk Tracks"
						labelPosition="center"
						classNames={{
							label: '!text-xl font-bold',
						}}
					/>
					<Tabs
						defaultValue="features"
						classNames={{
							tabLabel: 'text-lg font-bold',
						}}
					>
						<Tabs.List grow>
							<Tabs.Tab value="features">Features</Tabs.Tab>
							<Tabs.Tab value="positioning">Positioning</Tabs.Tab>
						</Tabs.List>
						<Tabs.Panel value="features">
							<div className="mt-10">
								<FeaturesTable
									m={meetings}
									customer_name=""
									salesRepId={salesRep?.id ?? ''}
									fetchAll={selectedSalesRepName === 'All'}
									hideSellerName={true}
								/>
							</div>
						</Tabs.Panel>
						<Tabs.Panel value="positioning">
							<div className="mt-10">
								<PositioningTable
									m={meetings}
									customer_name=""
									salesRepId={salesRep?.id ?? ''}
									fetchAll={selectedSalesRepName === 'All'}
									hideSellerName={true}
								/>
							</div>
						</Tabs.Panel>
					</Tabs>
				</div>
			</div>
		</>
	)
}
