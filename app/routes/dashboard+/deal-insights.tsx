import { Select, Tabs } from '@mantine/core'
import { type DataFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useState } from 'react'
import FeaturesTable from '#app/components/widgets/features-table.tsx'
import MomentOfGreatness from '#app/components/widgets/moments-of-greatness-table.tsx'
import PositioningTable from '#app/components/widgets/positioning-table.tsx'
import ReviewMoments from '#app/components/widgets/review-moments-table.tsx'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import {
	getAllCustomers,
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
	const meetings = getMeetingData()
	const customers = getAllCustomers(meetings)
	console.log('customers = ', customers)
	return {
		user: user,
		meetings: meetings,
		customers: customers,
	}
}

export default function CustomerDashboard() {
	const [selectedCustomerName, setCustomerName] = useState('')
	const { user, meetings, customers } = useLoaderData<typeof loader>()
	if (!selectedCustomerName) {
		setCustomerName(customers[0])
	}
	console.log('data = ', user)
	return (
		<>
			<div className="flex basis-10 justify-end gap-10 space-x-40 space-y-40">
				<div className="mx-auto flex flex-col gap-4">
					<h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
						Deal Insights
					</h1>
					<Select
						label="Customer"
						placeholder="Pick value"
						data={customers}
						defaultValue={customers[0]}
						className="w-fit"
						value={selectedCustomerName}
						onChange={value => setCustomerName(value ?? '')}
					/>
					<ReviewMoments
						m={meetings}
						customer_name={selectedCustomerName}
						salesRepId=""
						fetchAll={selectedCustomerName === 'All'}
					/>
					<MomentOfGreatness
						m={meetings}
						customer_name={selectedCustomerName}
						salesRepId=""
						fetchAll={selectedCustomerName === 'All'}
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
									customer_name={selectedCustomerName}
									salesRepId=""
									fetchAll={selectedCustomerName === 'All'}
									hideSellerName={true}
								/>
							</div>
						</Tabs.Panel>
						<Tabs.Panel value="positioning">
							<div className="mt-10">
								<PositioningTable
									m={meetings}
									customer_name={selectedCustomerName}
									salesRepId=""
									fetchAll={selectedCustomerName === 'All'}
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
