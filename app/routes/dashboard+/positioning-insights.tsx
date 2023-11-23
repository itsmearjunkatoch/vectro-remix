import { Table, Title, rem } from '@mantine/core'
import { type DataFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { IconCheck } from '@tabler/icons-react'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'

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
	return user
}

export default function NoteEdit() {
	const user = useLoaderData<typeof loader>()
	console.log('data = ', user)
	return (
		<>
			<div className="flex">
				<div className="mx-auto">
					<h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
						Positioning Insights
					</h1>
					<div className="flex basis-10 flex-col space-y-5">
						<CompanyPositioningAcrossCalls />
						<FeaturesPitchedAcrossCalls />
						{/* <MomentsOfGreatness /> */}
					</div>
				</div>
			</div>
		</>
	)
}

const check = (
	<IconCheck
		style={{ width: rem(20), height: rem(20) }}
		stroke={1.5}
		color="var(--mantine-color-blue-filled)"
	/>
)

const elements = [
	{
		key_points: 'Streamlines Agency Bill to Direct Bill Efficiency',
		kailyn_insurance_one: check,
		chris_mcdonald: check,
		chris_guidelight: check,
		frequency: 3,
	},
	{
		key_points: 'Reduction in Administrative Costs',
		kailyn_insurance_one: check,
		chris_mcdonald: check,
		// chris_guidelight: check,
		frequency: 2,
	},
	{
		key_points: 'Improves Speed & Efficiency',
		kailyn_insurance_one: check,
		chris_mcdonald: check,
		// chris_guidelight: check,
		frequency: 2,
	},
	{
		key_points: 'Increases Transparency',
		kailyn_insurance_one: check,
		// chris_mcdonald: check,
		chris_guidelight: check,
		frequency: 2,
	},
	{
		key_points: 'Enhances Customer Experience',
		kailyn_insurance_one: check,
		chris_mcdonald: check,
		// chris_guidelight: check,
		frequency: 2,
	},
	{
		key_points: 'Increases Operational Capacity',
		// kailyn_insurance_one: check,
		chris_mcdonald: check,
		// chris_guidelight: check,
		frequency: 1,
	},
	{
		key_points: 'Improves EBITDA through Automation',
		// kailyn_insurance_one: check,
		chris_mcdonald: check,
		// chris_guidelight: check,
		frequency: 1,
	},
	{
		key_points: 'Revenue Generation through Fees & Commissions',
		// kailyn_insurance_one: check,
		// chris_mcdonald: check,
		chris_guidelight: check,
		frequency: 1,
	},
	{
		key_points: 'Focus on Growth & Strategic Initiatives',
		// kailyn_insurance_one: check,
		chris_mcdonald: check,
		// chris_guidelight: check,
		frequency: 1,
	},
	{
		key_points: 'Adds Agency Fees to Bills',
		// kailyn_insurance_one: check,
		// chris_mcdonald: check,
		chris_guidelight: check,
		frequency: 1,
	},
	{
		key_points: 'Reduces Notice of Cancellations',
		// kailyn_insurance_one: check,
		// chris_mcdonald: check,
		chris_guidelight: check,
		frequency: 1,
	},
]

function CompanyPositioningAcrossCalls() {
	const rows = elements.map(element => (
		<Table.Tr key={element.key_points}>
			<Table.Td className="whitespace-nowrap">{element.key_points}</Table.Td>
			<Table.Td>
				<div className="flex">
					<div className="mx-auto">{element.kailyn_insurance_one}</div>
				</div>
			</Table.Td>
			<Table.Td>
				<div className="flex">
					<div className="mx-auto">{element.chris_mcdonald}</div>
				</div>
			</Table.Td>
			<Table.Td>
				<div className="flex">
					<div className="mx-auto">{element.chris_guidelight}</div>
				</div>
			</Table.Td>
			<Table.Td>
				<div className="flex">
					<div className="mx-auto">{element.frequency}</div>
				</div>
			</Table.Td>
		</Table.Tr>
	))

	return (
		<>
			<Title order={3}>Company Positioning Across Calls</Title>
			{/* <Table.ScrollContainer minWidth={500}> */}
			<Table
				verticalSpacing="sm"
				horizontalSpacing={30}
				layout="fixed"
				className="!w-[900px]"
			>
				<Table.Thead>
					<Table.Tr>
						<Table.Th className="w-96">Key Points</Table.Th>
						<Table.Th>
							<div className="mx-auto flex flex-col align-middle">
								<div className="text-center">Kailyn</div>
								<div className="text-center">Insurance One</div>
							</div>
						</Table.Th>
						<Table.Th>
							<div className="mx-auto flex flex-col align-middle">
								<div className="whitespace-nowrap text-center">
									Christopher S
								</div>
								<div className="text-center">Mcdonald Insurance</div>
							</div>
						</Table.Th>
						<Table.Th>
							<div className="mx-auto flex flex-col align-middle">
								<div className="whitespace-nowrap text-center">
									Christopher S
								</div>
								<div className="text-center">Guidelight</div>
							</div>
						</Table.Th>
						<Table.Th className="w-16">Total</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>{rows}</Table.Tbody>
			</Table>
			{/* </Table.ScrollContainer> */}
		</>
	)
}

const featuresElements = [
	{
		feature: 'Streamlined accounts processes',
		kaylin: true,
		chris_s_mcdonald: true,
		chris_s: true,
		chris_p: true,
	},
	{
		feature: 'Commission netting and market payments',
		kaylin: true,
		chris_s_mcdonald: false,
		chris_s: true,
		chris_p: true,
	},
	{
		feature: 'Custom checkout links for insureds',
		kaylin: false,
		chris_s_mcdonald: true,
		chris_s: true,
		chris_p: false,
	},
	{
		feature: 'Ability to pay in full or enroll in financing',
		kaylin: false,
		chris_s_mcdonald: false,
		chris_s: true,
		chris_p: true,
	},
	{
		feature: 'Branded email communications',
		kaylin: false,
		chris_s_mcdonald: false,
		chris_s: true,
		chris_p: true,
	},
	{
		feature: 'Visibility & tracking of payments/receivables',
		kaylin: false,
		chris_s_mcdonald: true,
		chris_s: true,
		chris_p: false,
	},
	{
		feature: 'Integration with NowCerts/AMS',
		kaylin: false,
		chris_s_mcdonald: true,
		chris_s: true,
		chris_p: false,
	},
	{
		feature: 'Automated payment reminders',
		kaylin: true,
		chris_s_mcdonald: true,
		chris_s: false,
		chris_p: false,
	},
	{
		feature: 'Account manager dashboard',
		kaylin: false,
		chris_s_mcdonald: true,
		chris_s: false,
		chris_p: true,
	},
	{
		feature: 'Policy information management',
		kaylin: true,
		chris_s_mcdonald: true,
		chris_s: false,
		chris_p: false,
	},
	{
		feature: 'Financing agreement management',
		kaylin: true,
		chris_s_mcdonald: false,
		chris_s: false,
		chris_p: true,
	},
	{
		feature: 'Addition of fees and charges',
		kaylin: false,
		chris_s_mcdonald: false,
		chris_s: true,
		chris_p: false,
	},
	{
		feature: 'Uploading documents & selecting coverage',
		kaylin: true,
		chris_s_mcdonald: false,
		chris_s: false,
		chris_p: false,
	},
	{
		feature: 'E-signature collection',
		kaylin: true,
		chris_s_mcdonald: false,
		chris_s: false,
		chris_p: false,
	},
	{
		feature: 'Self-service customer portal',
		kaylin: false,
		chris_s_mcdonald: true,
		chris_s: false,
		chris_p: false,
	},
	{
		feature: 'Integration with Plaid',
		kaylin: false,
		chris_s_mcdonald: true,
		chris_s: false,
		chris_p: false,
	},
	{
		feature: 'Cash flow management',
		kaylin: false,
		chris_s_mcdonald: true,
		chris_s: false,
		chris_p: false,
	},
	{
		feature: 'ROI calculator',
		kaylin: false,
		chris_s_mcdonald: true,
		chris_s: false,
		chris_p: false,
	},
	{
		feature: 'Internal payment notifications',
		kaylin: false,
		chris_s_mcdonald: false,
		chris_s: false,
		chris_p: true,
	},
	{
		feature: 'Accounts payable & receivable on per policy basis',
		kaylin: true,
		chris_s_mcdonald: false,
		chris_s: false,
		chris_p: false,
	},
	{
		feature: 'Auto pay enabling',
		kaylin: true,
		chris_s_mcdonald: false,
		chris_s: false,
		chris_p: false,
	},
	{
		feature: 'Comission approvals and net premium handling',
		kaylin: true,
		chris_s_mcdonald: false,
		chris_s: false,
		chris_p: false,
	},
	{
		feature: 'Record-keeping for reciepts and invoices',
		kaylin: true,
		chris_s_mcdonald: false,
		chris_s: false,
		chris_p: false,
	},
]

function get_icon(enabled: boolean) {
	if (enabled) {
		return check
	}
	return null
}

// @ts-ignore
function get_freq(element) {
	var i = 0
	for (var key of Object.keys(element)) {
		if (typeof element[key] == 'boolean') {
			i += element[key]
		}
	}
	return i
}

function FeaturesPitchedAcrossCalls() {
	const rows = featuresElements.map(element => (
		<Table.Tr key={element.feature}>
			<Table.Td className="whitespace-nowrap">{element.feature}</Table.Td>
			<Table.Td>
				<div className="flex">
					<div className="mx-auto">{get_icon(element.kaylin)}</div>
				</div>
			</Table.Td>
			<Table.Td>
				<div className="flex">
					<div className="mx-auto">{get_icon(element.chris_s_mcdonald)}</div>
				</div>
			</Table.Td>
			<Table.Td>
				<div className="flex">
					<div className="mx-auto">{get_icon(element.chris_s)}</div>
				</div>
			</Table.Td>
			<Table.Td>
				<div className="flex">
					<div className="mx-auto">{get_icon(element.chris_p)}</div>
				</div>
			</Table.Td>
			<Table.Td>
				<div className="flex">
					<div className="mx-auto">{get_freq(element)}</div>
				</div>
			</Table.Td>
		</Table.Tr>
	))

	return (
		<>
			<Title order={3}>Features Pitched Across Calls</Title>
			{/* <Table.ScrollContainer minWidth={1000}> */}
			<Table verticalSpacing="sm" layout="fixed" className="!w-[1000px]">
				<Table.Thead>
					<Table.Tr>
						<Table.Th className="w-96">Feature</Table.Th>
						<Table.Th>
							<div className="text-center">Kaylin</div>
							<div className="text-center">Insurance One</div>
						</Table.Th>
						<Table.Th>
							<div className="whitespace-nowrap text-center">Christopher S</div>
							<div className="text-center">Mcdonald Insurance</div>
						</Table.Th>
						<Table.Th>
							<div className="whitespace-nowrap text-center">Christopher S</div>
							<div className="text-center">Guidelight</div>
						</Table.Th>
						<Table.Th>
							<div className="text-center">Chris P</div>
							<div className="text-center">Blueridge</div>
						</Table.Th>
						<Table.Th className="w-16">
							<div className="text-center">Total</div>
						</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>{rows}</Table.Tbody>
			</Table>
			{/* </Table.ScrollContainer> */}
		</>
	)
}
