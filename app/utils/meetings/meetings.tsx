import { Avatar } from '@mantine/core'
import Lazy from 'lazy.js'
import chrisProfile from '#app/assets/chris.jpeg'
import christopherProfile from '#app/assets/chris_s.jpeg'
import kailynProfile from '#app/assets/kailyn.jpeg'
import RemixAnchor from '#app/components/ui/remix-anchor.tsx'

export type Meeting = {
	meetingId: string
	startTime: string
	link: string
	participants: string[]
	salesReps: SalesRep[]
	companyName: string
	reviewMoments: ReviewMoment[]
	featuresPitched: FeaturePitched[]
	momentsOfGreatness: MomentOfGreatness[]
	callScores: CallScore[]
	objections: Objection[]
	positioning: Positioning[]
}

export type SalesRep = {
	id: string
	name: string
	role: string
}

export type ReviewMoment = {
	salesRep: SalesRep
	description: string
	status: string
	link: string
	meetingId: string
}

export type FeaturePitched = {
	keyPoint: string
	salesRep: SalesRep
	meetingId: string
}

export type MomentOfGreatness = {
	salesRep: SalesRep
	description: string
	link: string
	meetingId: string
}

export type Positioning = {
	description: string
	salesRepId: string
	meetingId: string
}

export type IndividualScore = {
	score: number | string
	explaination?: string
}

export type CallScore = {
	salesRepId: string
	intro: IndividualScore
	callControl: IndividualScore
	qualificationRecap: IndividualScore
	discovery: IndividualScore
	championBuilding: IndividualScore
	businessCaseBuilding: IndividualScore
	objectionHandling: IndividualScore
	closingAbilities: IndividualScore
}

export type Meetings = Meeting[]

export enum ObjectionCategory {
	COMPETITION = 'Competition',
	NOTIFICATIONS = 'Notifications',
	PRICING = 'Pricing',
	PRIVACY = 'Privacy',
	TRAINING = 'Training',
	OTHER = 'Other',
}

export type Objection = {
	prospect: string
	category: ObjectionCategory
	description: string
	timestamp: string
}

export function getScoreTotal(callScore: CallScore) {
	return (
		Number(callScore.intro.score) +
		Number(callScore.callControl.score) +
		Number(callScore.qualificationRecap.score) +
		Number(callScore.discovery.score) +
		Number(callScore.championBuilding.score) +
		Number(callScore.businessCaseBuilding.score) +
		Number(callScore.objectionHandling.score) +
		Number(callScore.closingAbilities.score)
	)
}

export function getAvatarForSalesRep(salesRepId: string) {
	const salesRepIdToAvatar: { [key: string]: string } = {
		'1': kailynProfile,
		'2': chrisProfile,
		'3': christopherProfile,
	}
	const rep = getSalesRepById(salesRepId)
	return (
		<>
			<div className="justify-left flex items-center gap-2">
				<Avatar src={salesRepIdToAvatar[salesRepId]} />
				{rep.name}
			</div>
		</>
	)
}

export function getSalesRepById(salesRepId: string): SalesRep {
	const salesReps = getAllSalesReps()
	const salesRep = salesReps.find(salesRep => salesRep.id === salesRepId)
	if (!salesRep) {
		throw new Error(`No sales rep found with id ${salesRepId}`)
	}
	return salesRep
}

export function getAllCustomers(meetings: Meetings): string[] {
	return Lazy(meetings)
		.map(meeting => meeting.companyName)
		.uniq()
		.toArray()
}

export function getAllObjectionCategories(): string[] {
	return Object.values(ObjectionCategory)
}

export function getAllPositioning(meetings: Meetings): Positioning[] {
	return Lazy(meetings)
		.map(meeting => meeting.positioning)
		.flatten()
		.toArray()
}

export function getPositioningBySalesRepId(
	meetings: Meetings,
	salesRepId: string,
) {
	return Lazy(meetings)
		.map(meeting => meeting.positioning)
		.flatten()
		.filter(positioning => positioning.salesRepId === salesRepId)
		.toArray()
}

export function getPositioningByCustomerName(meetings: Meetings, name: string) {
	return Lazy(meetings)
		.filter(meeting => meeting.companyName === name)
		.map(meeting => meeting.positioning)
		.flatten()
		.toArray()
}

export function getAllSalesReps(): SalesRep[] {
	return [
		{
			id: '1',
			name: 'Kailyn Despotakis',
			role: 'Sales Rep',
		},
		{
			id: '2',
			name: 'Chris Peabody',
			role: 'Sales Rep',
		},
		{
			id: '3',
			name: 'Christopher Surdi',
			role: 'Sales Rep',
		},
	]
}

export function getAllProspects(meetings: Meetings): string[] {
	return Lazy(meetings)
		.map(meeting => meeting.companyName)
		.uniq()
		.toArray()
}

export function getMeetingTitle(meeting: Meeting) {
	const date = new Date(meeting.startTime)
	const humanReadableFormat = date.toLocaleString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	})
	return humanReadableFormat + ' - ' + meeting.companyName
}

export function getCallScoresForMeeting(meetings: Meetings, meetingId: string) {
	let meeting = meetings.find(meeting => meeting.meetingId === meetingId)
	return meeting?.callScores
}

export function getShortMeetingTitleInternal(meeting: Meeting) {
	const date = new Date(meeting.startTime)
	const humanReadableFormat = date.toLocaleString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	})
	return meeting.companyName + ' - ' + humanReadableFormat
}

export function getMeetingAchor(meetings: Meetings, meetingId: string) {
	let meeting = meetings.find(meeting => meeting.meetingId === meetingId)
	if (!meeting) {
		throw new Error(`No meeting found with id ${meetingId}`)
	}
	const shortMeetingTitle = getShortMeetingTitleInternal(meeting)
	return (
		<RemixAnchor to={'/meeting/' + meeting?.meetingId}>
			{shortMeetingTitle}
		</RemixAnchor>
	)
}

export function getShortMeetingTitle(meetings: Meetings, meetingId: string) {
	let meeting = meetings.find(meeting => meeting.meetingId === meetingId)
	if (!meeting) {
		throw new Error(`No meeting found with id ${meetingId}`)
	}
	return getShortMeetingTitleInternal(meeting)
}

export function getAllObjections(meetings: Meetings): Objection[] {
	return Lazy(meetings)
		.map(meeting => meeting.objections)
		.flatten()
		.toArray()
}

export function getAllObjectionsByCategory(
	meetings: Meetings,
	category: ObjectionCategory,
): Objection[] {
	return Lazy(meetings)
		.map(meeting => meeting.objections)
		.flatten()
		.filter(objection => objection.category === category)
		.toArray()
}

export function getMeetingData(): Meetings {
	const meetings: Meetings = [
		{
			meetingId: '6d9d377a-7d87-4531-9eb1-559c516f98a5',
			startTime: '2023-10-17T15:00:23.288936Z',
			link: 'https://grain.com/share/recording/6d9d377a-7d87-4531-9eb1-559c516f98a5/G6sFYofU571Vw6KKo3jvmxItEmjqrnJagmOo4ADk',
			participants: ['Lindsey Lyons'],
			salesReps: [getSalesRepById('1')],
			companyName: 'Insurance One',
			reviewMoments: [
				{
					salesRep: getSalesRepById('1'),
					description: 'Update slide to latest version',
					link: 'https://grain.com/share/highlight/RKP4GgDHgKPyYTbWFF5901MWUHHczvR4YyYJh7wm',
					status: 'Green',
					meetingId: '6d9d377a-7d87-4531-9eb1-559c516f98a5',
				},
				{
					salesRep: getSalesRepById('1'),
					description: 'Carrier Invoices',
					link: 'https://grain.com/share/highlight/l8yp5IVQZZWRxtxbI8Qvfq4WXTFkjgAw1LvAgWzk',
					status: 'Green',
					meetingId: '6d9d377a-7d87-4531-9eb1-559c516f98a5',
				},
			],
			featuresPitched: [
				{
					keyPoint: 'Streamlined accounts processes',
					salesRep: getSalesRepById('1'),
					meetingId: '6d9d377a-7d87-4531-9eb1-559c516f98a5',
				},
				{
					keyPoint: 'Commission netting and market payments',
					salesRep: getSalesRepById('1'),
					meetingId: '6d9d377a-7d87-4531-9eb1-559c516f98a5',
				},
				{
					keyPoint: 'Automated payment reminders',
					salesRep: getSalesRepById('1'),
					meetingId: '6d9d377a-7d87-4531-9eb1-559c516f98a5',
				},
				{
					keyPoint: 'Policy information management',
					salesRep: getSalesRepById('1'),
					meetingId: '6d9d377a-7d87-4531-9eb1-559c516f98a5',
				},
				{
					keyPoint: 'Financing agreement management',
					salesRep: getSalesRepById('1'),
					meetingId: '6d9d377a-7d87-4531-9eb1-559c516f98a5',
				},
				{
					keyPoint: 'Uploading documents & selecting coverage',
					salesRep: getSalesRepById('1'),
					meetingId: '6d9d377a-7d87-4531-9eb1-559c516f98a5',
				},
				{
					keyPoint: 'E-signature collection',
					salesRep: getSalesRepById('1'),
					meetingId: '6d9d377a-7d87-4531-9eb1-559c516f98a5',
				},
				{
					keyPoint: 'Accounts payable & receivable on per policy basis',
					salesRep: getSalesRepById('1'),
					meetingId: '6d9d377a-7d87-4531-9eb1-559c516f98a5',
				},
				{
					keyPoint: 'Auto pay enabling',
					salesRep: getSalesRepById('1'),
					meetingId: '6d9d377a-7d87-4531-9eb1-559c516f98a5',
				},
				{
					keyPoint: 'Comission approvals and net premium handling',
					salesRep: getSalesRepById('1'),
					meetingId: '6d9d377a-7d87-4531-9eb1-559c516f98a5',
				},
				{
					keyPoint: 'Record-keeping for reciepts and invoices',
					salesRep: getSalesRepById('1'),
					meetingId: '6d9d377a-7d87-4531-9eb1-559c516f98a5',
				},
			],
			momentsOfGreatness: [
				{
					salesRep: getSalesRepById('1'),
					description: 'Referred relevant customer',
					link: 'https://grain.com/share/highlight/CKK3D2VslMfwysV5cY71HjxhC2lIoSCdVID3HKFE',
					meetingId: '6d9d377a-7d87-4531-9eb1-559c516f98a5',
				},
				{
					salesRep: getSalesRepById('1'),
					description: 'Offered 2:1 demo',
					link: 'https://grain.com/share/highlight/PTA3OhIKQQnlavmVA7enoVhUg6GXYEIHaCjUueGB',
					meetingId: '6d9d377a-7d87-4531-9eb1-559c516f98a5',
				},
			],
			callScores: [
				{
					salesRepId: '1',
					intro: { score: 9 },
					callControl: { score: 9 },
					qualificationRecap: {
						score: 3,
						explaination: `Timestamp: 09:48 - 10:55
                    Interaction Issue: Kailyn Despotakis does attempt to summarize LindseyLyons' objectives and understanding by saying, "No worries, but kind of a brief agenda. We already did our introductions... Thanks, and we already went through this metric slide. I didn't ask the average policy size if you could estimate what do you think that would..."
                    
                    Analysis: Kailyn's recap of the objectives and understanding appears rushed and not well-structured. She bundles the recap with a small additional question about average policy size. There is no explicit validation of the pain/gain or compelling event that instigated the call. This portion of the conversation does not provide a strong demonstration of understanding the relevant value propositions or the specific reasons that prompted the prospect to take the call.
                    
                    Timestamp: 27:22 - 27:58
                    Interaction Issue: Here Kailyn is explaining to Lindsey about how Ascend is beneficial and states, "We've built in the signature on the pfa into the payment workflow, so there's no more back and forth with the customer trying to get a signature on the pfa..."
                    
                    Analysis: This section does a better job of connecting Ascend's offerings to the prospect's potential pain points, like handling paperwork and the back-and-forth with clients. However, it still lacks a direct engagement on the initial pain/gain and compelling event. Kailyn does not explicitly seek validation of the business case or confirmation that these are the main reasons why Lindsey is considering their service.
                    
                    Score: 3
                    
                    Kailyn's performance based on the specified criteria would be scored low, as there isn't sufficient effort to connect the value proposition to the specific reasons why the prospect agreed to the call. Kailyn's approach is more focused on explaining the features of the service rather than tying those features back to Lindsey's expressed concerns or goals, thus not effectively building a business case or validating the initial qual call.`,
					},
					discovery: { score: 9 },
					championBuilding: { score: 8 },
					businessCaseBuilding: { score: 9 },
					objectionHandling: { score: 8 },
					closingAbilities: { score: 8 },
				},
			],
			objections: [
				{
					prospect: 'Insurance One',
					category: ObjectionCategory.COMPETITION,
					description:
						"Who are Ascend's main competitors and what makes Ascend stand out from them?",
					timestamp: '[1:02:07]',
				},
				{
					prospect: 'Insurance One',
					category: ObjectionCategory.NOTIFICATIONS,
					description:
						'What happens if the customer does not pay after several reminders?',
					timestamp: '[21:22]',
				},
				{
					prospect: 'Insurance One',
					category: ObjectionCategory.NOTIFICATIONS,
					description:
						'How fast can an email get sent out to the client with their payment option once policy details are inputted?',
					timestamp: '[25:17]',
				},
				{
					prospect: 'Insurance One',
					category: ObjectionCategory.OTHER,
					description:
						"What does it look like for the rep's side concerning carriers invoicing the agency? How do they handle that with Ascend?",
					timestamp: '[58:47]',
				},
				{
					prospect: 'Insurance One',
					category: ObjectionCategory.OTHER,
					description:
						'Concern about whether there are any carriers that Ascend cannot pay or if there have been any issues with specific carriers.',
					timestamp: '[36:51]',
				},
				{
					prospect: 'Insurance One',
					category: ObjectionCategory.PRICING,
					description: 'What is your financing percentage?',
					timestamp: '[47:21]',
				},
				{
					prospect: 'Insurance One',
					category: ObjectionCategory.PRIVACY,
					description:
						'Do you share data with any other companies or sell it to third parties?',
					timestamp: '[42:35]',
				},
				{
					prospect: 'Insurance One',
					category: ObjectionCategory.TRAINING,
					description:
						'What does training look like for different account managers or accounting staff?',
					timestamp: '[59:22]',
				},
			],
			positioning: [
				{
					salesRepId: '1',
					description: 'Streamlines Agency Bill to Direct Bill Efficiency',
					meetingId: '6d9d377a-7d87-4531-9eb1-559c516f98a5',
				},
				{
					salesRepId: '1',
					description: 'Reduction in Administrative Costs',
					meetingId: '6d9d377a-7d87-4531-9eb1-559c516f98a5',
				},
				{
					salesRepId: '1',
					description: 'Improves Speed & Efficiency',
					meetingId: '6d9d377a-7d87-4531-9eb1-559c516f98a5',
				},
				{
					salesRepId: '1',
					description: 'Increases Transparency',
					meetingId: '6d9d377a-7d87-4531-9eb1-559c516f98a5',
				},
				{
					salesRepId: '1',
					description: 'Enhances Customer Experience',
					meetingId: '6d9d377a-7d87-4531-9eb1-559c516f98a5',
				},
			],
		},
		{
			meetingId: '34cdb005-3e96-4fd1-8cd0-d0763c493840',
			startTime: '2023-09-14T13:27:46.229092Z',
			link: 'https://grain.com/share/recording/34cdb005-3e96-4fd1-8cd0-d0763c493840/KUAbKpvFGXWmNQH2MpgiXPSnCezsDpfzpyCayITK',
			participants: ['Sharon Hoffeditz'],
			salesReps: [getSalesRepById('2')],
			companyName: 'Blue Ridge Insurance',
			reviewMoments: [
				{
					salesRep: getSalesRepById('2'),
					description: 'Consider schedule meeting earlier',
					status: 'Red',
					link: 'https://grain.com/share/highlight/Po8Dx0W4r5Gr6V6MyO2K3A6bnjmMtudSzZ7kv5nb',
					meetingId: '34cdb005-3e96-4fd1-8cd0-d0763c493840',
				},
			],
			featuresPitched: [
				{
					keyPoint: 'Streamlined accounts processes',
					salesRep: getSalesRepById('2'),
					meetingId: '34cdb005-3e96-4fd1-8cd0-d0763c493840',
				},
				{
					keyPoint: 'Commission netting and market payments',
					salesRep: getSalesRepById('2'),
					meetingId: '34cdb005-3e96-4fd1-8cd0-d0763c493840',
				},
				{
					keyPoint: 'Ability to pay in full or enroll in financing',
					salesRep: getSalesRepById('2'),
					meetingId: '34cdb005-3e96-4fd1-8cd0-d0763c493840',
				},
				{
					keyPoint: 'Branded email communications',
					salesRep: getSalesRepById('2'),
					meetingId: '34cdb005-3e96-4fd1-8cd0-d0763c493840',
				},
				{
					keyPoint: 'Account manager dashboard',
					salesRep: getSalesRepById('2'),
					meetingId: '34cdb005-3e96-4fd1-8cd0-d0763c493840',
				},
				{
					keyPoint: 'Financing agreement management',
					salesRep: getSalesRepById('2'),
					meetingId: '34cdb005-3e96-4fd1-8cd0-d0763c493840',
				},
				{
					keyPoint: 'Internal payment notifications',
					salesRep: getSalesRepById('2'),
					meetingId: '34cdb005-3e96-4fd1-8cd0-d0763c493840',
				},
			],
			momentsOfGreatness: [],
			callScores: [
				{
					salesRepId: '2',
					intro: {
						score: 5,
						explaination: `Timestamp: 03:34-05:34

                        Chris Peabody's interaction at the beginning of the call could have been more effective. Although he did greet Sharon and Beth, there was a technical issue with Beth not being able to hear them, which disrupted the flow of the introductions and the initial part of the conversation. Chris did not immediately address the technical problem but instead moved on with conversation with Sharon. He also did not provide a formal reintroduction or a thorough introduction for himself, which would have been helpful given that there was a new contact, Beth, in the call. There was also an opportunity to clarify everyone’s role at the beginning to ensure an understanding of the context each person was bringing to the conversation. 
                        
                        Score: 5
                        
                        The score reflects that Chris showed courtesy and recognition of the participants but did not thoroughly establish the roles and context for the new participant, Beth, which could have potentially improved the direction and focus of the call from the start.`,
					},
					callControl: { score: 7 },
					qualificationRecap: { score: 6 },
					discovery: { score: 7 },
					championBuilding: { score: 7 },
					businessCaseBuilding: {
						score: 4,
						explaination: `Timestamp: 41:50 - 43:36

                    Chris Peabody doesn't seem to fully grasp Sharon's question regarding the process for handling large accounts that receive terms and may pay 15-30 days after receiving an invoice (as opposed to up front), which is a common situation in their business. While Sharon is trying to explain a common practice with a long-standing client, Chris appears to misinterpret this several times – first asking if this is a financing situation and then assuming it is an installment plan. This misunderstanding indicates that Chris may not have fully comprehended this aspect of the prospect's current state and their particular challenge, which is important for understanding their desired future state and positive business outcomes they are expecting from any new solution.
                    
                    Timestamps: 14:04 - 14:47
                    
                    During this section, there is a degree of confusion surrounding the discussion of how the process would change with regard to receivables and billing through Ascend. The rep Chris Peabody should have anticipated and clarified how integrating Ascend would interact with the client’s existing processes that are closely tied to their accounts receivable. There appears to be a lack of understanding or clear communication about how existing payment terms would align with Ascend’s system as Sharon raises concerns about how their current terms granted to clients would work with Ascend’s system.
                    
                    Based on the complexity of the challenge and the miscommunication observed in the call, the score reflecting the rep's performance in meeting the "front 9" challenge of understanding the prospect's current state, challenges, desired future state, and positive business outcomes is:
                    
                    Score: 4
                    
                    This score reflects that while Chris showed effort and enthusiasm in understanding and documenting the current process, there were notable gaps in directly addressing and understanding the specific challenges and concerns brought up by Sharon regarding the handling of long-standing client relationships and term payments – critical aspects for the prospect in considering a new system.`,
					},
					objectionHandling: {
						score: 5,
						explaination: `Timestamp: 11:57 - 13:14
                    In the mentioned interaction, SharonHoffeditz described a particular scenario with a longstanding client who takes 15-30 days to pay in full and questioned how the new system would accommodate that established process. Chris Peabody's response initially seemed to misinterpret the question as related to financing terms rather than addressing the specific accounts receivable process for a longstanding client. There was some confusion, and the need to repeat and clarify the situation indicates a lack of deep understanding initially.
                    
                    Timestamp: 20:01 - 20:24
                    Another example of not eliciting and thoroughly addressing objections arises when Beth asks about the process for clients who receive an invoice from Blue Ridge and then have 15 days to make a payment. Chris responds with information about payment link expiration, but doesn't deeply explore the issue or ask "why" to better understand how the established client practices would interplay with Ascend’s system.
                    
                    Score: 5
                    
                    The score reflects the lack of "why" questions to get to the bottom of the prospects' practices, which would be crucial to addressing their concerns thoroughly. It also accounts for the correct handling of some explanations and other interactions but highlights the areas where Chris could've asked more probing questions to better understand and address the specific use cases presented by Sharon and Beth.`,
					},
					closingAbilities: {
						score: 9,
						explaination: `Based on the call provided, the rep Chris Peabody demonstrated thoroughness in closing and establishing next steps towards the end of the conversation with Sharon Hoffeditz and Beth Roles. The exchange in question begins at timestamp 54:27 and concludes at timestamp 57:28.


                    Chris's performance shows attention to detail in solidifying the next steps, ensuring clarity around future actions, and accommodating the specific scheduling needs of Sharon and Beth.
                    
                    Score: 9
                    
                    The only point deducted is due to a minor lack of clarity on the deliverables and the specific tasks to be accomplished by each party before the next meeting, which might have been covered better in the summary of next steps. Otherwise, Chris's performance was thorough and considerate of the client's needs and schedules.`,
					},
				},
			],
			objections: [
				{
					prospect: 'Blue Ridge',
					category: ObjectionCategory.COMPETITION,
					description:
						'Concern about the lack of integration with Applied, which requires manual posting of payments received through ePay.',
					timestamp: '[40:44]',
				},
				{
					prospect: 'Blue Ridge',
					category: ObjectionCategory.OTHER,
					description:
						"Clarification needed on how Ascend's system would accommodate clients who are granted terms and pay in full after 15 to 30 days, as they have always done.",
					timestamp: '[11:57]',
				},
				{
					prospect: 'Blue Ridge',
					category: ObjectionCategory.OTHER,
					description:
						"Concern about how Ascend's system would handle clients that pay based on a statement rather than upfront or through financing.",
					timestamp: '[12:59]',
				},
				{
					prospect: 'Blue Ridge',
					category: ObjectionCategory.OTHER,
					description:
						'Concern about the process of reconciling batch payments from ePay with individual client accounts.',
					timestamp: '[30:32]',
				},
				{
					prospect: 'Blue Ridge',
					category: ObjectionCategory.PRICING,
					description:
						'Fees associated with different types of payments (credit card, ACH, wire) in the Ascend system.',
					timestamp: '[48:33]',
				},
			],
			positioning: [],
		},
		// Two meetings for Christopher S
		{
			meetingId: '84b1599c-105b-4168-b228-96ecff765e80',
			startTime: '2023-10-10T18:00:59.386654Z',
			link: 'https://grain.com/share/recording/84b1599c-105b-4168-b228-96ecff765e80/sNJNnROhjjRbSgzsD1F2Jt3Z1aBLhQliRwB85iWv',
			participants: ['Jason Trent'],
			salesReps: [getSalesRepById('3')],
			companyName: 'Guidelight',
			reviewMoments: [
				{
					salesRep: getSalesRepById('3'),
					description: 'Agency Fees Average',
					status: 'Green',
					link: 'https://grain.com/share/highlight/BrNWUmGotZk2pgkdtivr2OjkrlD0gWF07C8lUbmd',
					meetingId: '84b1599c-105b-4168-b228-96ecff765e80',
				},
			], // Add reviewMoments specific to this meeting
			featuresPitched: [
				// Add features specific to this meeting
				{
					keyPoint: 'Streamlined accounts processes',
					salesRep: getSalesRepById('3'),
					meetingId: '84b1599c-105b-4168-b228-96ecff765e80',
				},
				{
					keyPoint: 'Commission netting and market payments',
					salesRep: getSalesRepById('3'),
					meetingId: '84b1599c-105b-4168-b228-96ecff765e80',
				},
				{
					keyPoint: 'Custom checkout links for insureds',
					salesRep: getSalesRepById('3'),
					meetingId: '84b1599c-105b-4168-b228-96ecff765e80',
				},
				{
					keyPoint: 'Ability to pay in full or enroll in financing',
					salesRep: getSalesRepById('3'),
					meetingId: '84b1599c-105b-4168-b228-96ecff765e80',
				},
				{
					keyPoint: 'Branded email communications',
					salesRep: getSalesRepById('3'),
					meetingId: '84b1599c-105b-4168-b228-96ecff765e80',
				},
				{
					keyPoint: 'Visibility & tracking of payments/receivables',
					salesRep: getSalesRepById('3'),
					meetingId: '84b1599c-105b-4168-b228-96ecff765e80',
				},
				{
					keyPoint: 'Integration with NowCerts/AMS',
					salesRep: getSalesRepById('3'),
					meetingId: '84b1599c-105b-4168-b228-96ecff765e80',
				},
				{
					keyPoint: 'Addition of fees and charges',
					salesRep: getSalesRepById('3'),
					meetingId: '84b1599c-105b-4168-b228-96ecff765e80',
				},
			],
			momentsOfGreatness: [
				// Add moments of greatness specific to this meeting
			],
			callScores: [
				{
					salesRepId: '3',
					intro: { score: 6 },
					callControl: { score: 9 },
					qualificationRecap: { score: 9 },
					discovery: { score: 9 },
					championBuilding: { score: 9 },
					businessCaseBuilding: { score: 9 },
					objectionHandling: { score: 7 },
					closingAbilities: {
						score: 10,
						explaination: `Timestamp: 55:26 - 56:32

                    The representative, Christopher, was quite thorough in closing the conversation and establishing next steps with Rob Jackson and Jessica Harrison. He addressed potential concerns about the system's implementation and cost, acknowledged the need for buy-in from both the accounts payable and receivable teams, and understood that there was a need for further discussion with more team members, including High Street's CFO and accounting support team.
                    
                    Christopher proposed creating an ROI calculator to provide a more detailed analysis of how the Ascend system could benefit their operations. He showed understanding about the merging of another agency and suggested including their data in the analysis for a comprehensive overview. He also respectfully noted Jessica's upcoming week off and scheduled a follow-up meeting for a time that worked for both Rob and Jessica, ensuring continuity in their conversation. The next steps included Christopher sending an email invite for the follow-up meeting and requesting additional information via email from Jessica to prepare for their next discussion. Overall, Christopher effectively closed the call by securing a follow-up meeting, thus establishing clear next steps for both parties. 
                    
                    Score: 10`,
					},
				},
			],
			objections: [
				{
					prospect: 'Guidelight',
					category: ObjectionCategory.COMPETITION,
					description:
						'How does Ascend compare to Applied Pay? Does it replace it?',
					timestamp: '[17:27]',
				},
				{
					prospect: 'Guidelight',
					category: ObjectionCategory.OTHER,
					description: 'How do the policy, broker or stamping fees get set?',
					timestamp: '[38:15]',
				},
				{
					prospect: 'Guidelight',
					category: ObjectionCategory.OTHER,
					description:
						'Does Ascend use webhooks and API to pull data from AMS?',
					timestamp: '[39:22]',
				},
				{
					prospect: 'Guidelight',
					category: ObjectionCategory.OTHER,
					description: 'What are standard agency fees charged by others?',
					timestamp: '[16:25]',
				},
			],
			positioning: [
				{
					salesRepId: '3',
					description: 'Streamlines Agency Bill to Direct Bill Efficiency',
					meetingId: '84b1599c-105b-4168-b228-96ecff765e80',
				},
				{
					salesRepId: '3',
					description: 'Reduction in Administrative Costs',
					meetingId: '84b1599c-105b-4168-b228-96ecff765e80',
				},
				{
					salesRepId: '3',
					description: 'Improves Speed & Efficiency',
					meetingId: '84b1599c-105b-4168-b228-96ecff765e80',
				},
				{
					salesRepId: '3',
					description: 'Enhances Customer Experience',
					meetingId: '84b1599c-105b-4168-b228-96ecff765e80',
				},
				{
					salesRepId: '3',
					description: 'Increases Operational Capacity',
					meetingId: '84b1599c-105b-4168-b228-96ecff765e80',
				},
				{
					salesRepId: '3',
					description: 'Improves EBITDA through Automation',
					meetingId: '84b1599c-105b-4168-b228-96ecff765e80',
				},
				{
					salesRepId: '3',
					description: 'Focus on Growth & Strategic Initiatives',
					meetingId: '84b1599c-105b-4168-b228-96ecff765e80',
				},
			],
		},
		{
			meetingId: 'a831d417-b3f3-459b-9de5-be8af2d17ba8',
			startTime: '2023-11-13T14:00:00',
			link: 'https://grain.com/share/recording/a831d417-b3f3-459b-9de5-be8af2d17ba8/aXTpFk79UTEQKeCBIYjnk93dwu36TR5uw47wNCcU',
			participants: ['Participant G', 'Participant H'],
			salesReps: [getSalesRepById('3')],
			companyName: 'McDonald Insurance',
			reviewMoments: [], // Add reviewMoments specific to this meeting
			featuresPitched: [
				{
					keyPoint: 'Streamlined accounts processes',
					salesRep: getSalesRepById('3'),
					meetingId: 'a831d417-b3f3-459b-9de5-be8af2d17ba8',
				},
				{
					keyPoint: 'Custom checkout links for insureds',
					salesRep: getSalesRepById('3'),
					meetingId: 'a831d417-b3f3-459b-9de5-be8af2d17ba8',
				},
				{
					keyPoint: 'Visibility & tracking of payments/receivables',
					salesRep: getSalesRepById('3'),
					meetingId: 'a831d417-b3f3-459b-9de5-be8af2d17ba8',
				},
				{
					keyPoint: 'Integration with NowCerts/AMS',
					salesRep: getSalesRepById('3'),
					meetingId: 'a831d417-b3f3-459b-9de5-be8af2d17ba8',
				},
				{
					keyPoint: 'Automated payment reminders',
					salesRep: getSalesRepById('3'),
					meetingId: 'a831d417-b3f3-459b-9de5-be8af2d17ba8',
				},
				{
					keyPoint: 'Account manager dashboard',
					salesRep: getSalesRepById('3'),
					meetingId: 'a831d417-b3f3-459b-9de5-be8af2d17ba8',
				},
				{
					keyPoint: 'Policy information management',
					salesRep: getSalesRepById('3'),
					meetingId: 'a831d417-b3f3-459b-9de5-be8af2d17ba8',
				},
				{
					keyPoint: 'Self-service customer portal',
					salesRep: getSalesRepById('3'),
					meetingId: 'a831d417-b3f3-459b-9de5-be8af2d17ba8',
				},
				{
					keyPoint: 'Integration with Plaid',
					salesRep: getSalesRepById('3'),
					meetingId: 'a831d417-b3f3-459b-9de5-be8af2d17ba8',
				},
				{
					keyPoint: 'Cash flow management',
					salesRep: getSalesRepById('3'),
					meetingId: 'a831d417-b3f3-459b-9de5-be8af2d17ba8',
				},
				{
					keyPoint: 'ROI calculator',
					salesRep: getSalesRepById('3'),
					meetingId: 'a831d417-b3f3-459b-9de5-be8af2d17ba8',
				},
			],
			momentsOfGreatness: [
				// Add moments of greatness specific to this meeting
			],
			callScores: [
				{
					salesRepId: '3',
					intro: { score: 7 },
					callControl: { score: 9 },
					qualificationRecap: { score: 7 },
					discovery: { score: 9 },
					championBuilding: { score: 9 },
					businessCaseBuilding: { score: 8 },
					objectionHandling: { score: 6 },
					closingAbilities: { score: 9 },
				},
			],
			objections: [
				{
					prospect: 'Mcdonald Insurance',
					category: ObjectionCategory.COMPETITION,
					description:
						"Preference for using Applied Pay and how it compares to Ascend's offering. Partnership level agreements will affect decision",
					timestamp: '[44:11]',
				},
				{
					prospect: 'Mcdonald Insurance',
					category: ObjectionCategory.PRICING,
					description:
						"Request for a discussion about the cost of Ascend's service before considering implementation and getting buy-in from other team members.",
					timestamp: '[52:56]',
				},
			],
			positioning: [
				{
					salesRepId: '3',
					description: 'Streamlines Agency Bill to Direct Bill Efficiency',
					meetingId: 'a831d417-b3f3-459b-9de5-be8af2d17ba8',
				},
				{
					salesRepId: '3',
					description: 'Increases Transparency',
					meetingId: 'a831d417-b3f3-459b-9de5-be8af2d17ba8',
				},
				{
					salesRepId: '3',
					description: 'Revenue Generation through Fees & Commisions',
					meetingId: 'a831d417-b3f3-459b-9de5-be8af2d17ba8',
				},
				{
					salesRepId: '3',
					description: 'Adds Agency Fees to Bills',
					meetingId: 'a831d417-b3f3-459b-9de5-be8af2d17ba8',
				},
				{
					salesRepId: '3',
					description: 'Reduces Notice of Cancellations',
					meetingId: 'a831d417-b3f3-459b-9de5-be8af2d17ba8',
				},
			],
		},
	]
	return meetings
}

export function getMomentOfGreatnessPitchedBySalesRep(
	salesRepId: string,
	meetings: Meeting[],
): MomentOfGreatness[] {
	return Lazy(meetings)
		.map(meeting => meeting.momentsOfGreatness)
		.flatten()
		.filter(moment => moment.salesRep.id === salesRepId) // Filter moments by salesRepId
		.toArray() // Convert the Lazy sequence back to an array
}

export function getMomentOfGreatnessByCustomer(
	customer: string,
	meetings: Meeting[],
) {
	return Lazy(meetings)
		.filter(meeting => meeting.companyName === customer)
		.map(meeting => meeting.momentsOfGreatness)
		.flatten()
		.toArray()
}

export function getFeaturesPitchedBySalesRep(
	salesRepId: string,
	meetings: Meeting[],
): FeaturePitched[] {
	return Lazy(meetings)
		.map(meeting => meeting.featuresPitched)
		.flatten()
		.filter(feature => feature.salesRep.id === salesRepId) // Filter features by salesRepId
		.toArray() // Convert the Lazy sequence back to an array
}

export function getAllreviewMoments(meetings: Meeting[]) {
	return Lazy(meetings)
		.map(meeting => meeting.reviewMoments)
		.flatten()
		.toArray()
}

export function getAllMomentsOfGreatness(meetings: Meeting[]) {
	return Lazy(meetings)
		.map(meeting => meeting.momentsOfGreatness)
		.flatten()
		.toArray()
}

export function getAllFeaturesPitched(meetings: Meeting[]) {
	return Lazy(meetings)
		.map(meeting => meeting.featuresPitched)
		.flatten()
		.toArray()
}

export function getreviewMomentsBySalesRep(
	salesRepId: string,
	meetings: Meeting[],
) {
	return Lazy(meetings)
		.map(meeting => meeting.reviewMoments)
		.flatten()
		.filter(objection => objection.salesRep.id === salesRepId)
		.toArray()
}

export function getFeaturesByCustomer(customer: string, meetings: Meeting[]) {
	return Lazy(meetings)
		.filter(meeting => meeting.companyName === customer)
		.map(meeting => meeting.featuresPitched)
		.flatten()
		.toArray()
}

export function getreviewMomentsByCustomer(
	customer: string,
	meetings: Meeting[],
) {
	return Lazy(meetings)
		.filter(meeting => meeting.companyName === customer)
		.map(meeting => meeting.reviewMoments)
		.flatten()
		.toArray()
}

export function getSalesRepWhoPitchedFeature(
	feature: string,
	meetings: Meeting[],
) {
	return Lazy(meetings)
		.map(meeting => meeting.featuresPitched)
		.flatten()
		.filter(featurePitched => featurePitched.keyPoint === feature)
		.map(featurePitched => featurePitched.salesRep)
		.toArray()
}
