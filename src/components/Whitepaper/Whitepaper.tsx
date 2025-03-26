import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Shield, Layers, Code, Map, Download, ChevronDown, ChevronRight, PieChart } from 'lucide-react';
import { GradientButton } from '../ui/gradient-button';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

interface WhitepaperSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const Whitepaper: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('introduction');
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    'introduction': true
  });

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const sections: WhitepaperSection[] = [
    {
      id: 'introduction',
      title: 'Introduction',
      icon: <BookOpen className="h-5 w-5" />,
      content: (
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-white/80">
                The world is racing toward a digital future, where artificial intelligence (AI) promises to redefine how we live, work, and create. Yet, the immense computing power required to fuel AI remains locked behind centralized systems—expensive, exclusive, and out of reach for most. Cryptocurrency has emerged as the next step in the evolution of money, and AIIGo takes this revolution further, transforming the landscape of AI computing. AIIGo is the first AI computing platform secured and operated by everyday people, breaking down barriers and ushering in a new era of distributed AI computing for global adoption.
              </p>
              
              <p className="text-lg leading-relaxed text-white/80">
                AIIGo harnesses the power of blockchain technology to decentralize access to computing resources. Built on Ethereum's proven source code, our platform allows anyone with idle hardware—whether CPU, GPU, disk, or network bandwidth—to contribute to a global network. In return, participants earn reward tokens, creating a vibrant, peer-to-peer marketplace where AI developers, researchers, and businesses can tap into affordable, scalable computing power. This innovative model slashes costs, eliminates reliance on centralized gatekeepers, and empowers a worldwide community to drive AI innovation.
              </p>
              
              <p className="text-lg leading-relaxed text-white/80">
                At the core of AIIGo lies its native cryptocurrency, a unified settlement currency that powers every transaction within the platform. This digital currency ensures that exchanges of computing resources are seamless, transparent, and efficient, connecting contributors and users in a dynamic ecosystem. Whether you're providing resources or building the next AI breakthrough, AIIGo's cryptocurrency makes participation simple and rewarding, fostering collaboration on a scale never seen before.
              </p>
              
              <p className="text-lg leading-relaxed text-white/80">
                The commercial value of AIIGo extends beyond being just a platform—it represents a revolutionary computing power fusion service bridging both worlds. By seamlessly integrating AI capabilities from the traditional Web2 ecosystem with the decentralized infrastructure of the Web3 cryptosphere, AIIGo creates unprecedented opportunities for innovation and collaboration. This unified approach democratizes access to computing resources, establishing a robust marketplace where developers, businesses, and individuals can harness powerful AI capabilities without traditional barriers, fundamentally transforming how computing power is distributed, accessed, and monetized across digital ecosystems.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4">Our Mission</h3>
          <p className="mb-6 text-white/80">
            Build an AI computing platform and smart contracts infrastructure secured and operated by everyday people.
          </p>
          
          <h3 className="text-xl font-bold mb-4">Our Vision</h3>
          <p className="mb-6 text-white/80">
            Build the world's most inclusive peer-to-peer ecosystem and online experience, fueled by AIIGo, the world's most widely used distributed AI computing network.
          </p>
          
          <h3 className="text-xl font-bold mb-4">Why Distributed AI Computing Matters</h3>
          <p className="mb-4 text-white/80">
            Currently, our everyday AI computing resources rely upon a trusted third party to maintain a record of computations. For example, when you use cloud AI services, the service provider keeps a record and guarantees that the computation is secure and reliable. Likewise, when a business uses enterprise AI tools, the software company maintains a central record of access and usage.
          </p>
          <p className="mb-6 text-white/80">
            Intermediaries like Big Tech companies, cloud AI providers, and other members of the current economic system play an important role in regulating the world's AI resources, but this role has limitations:
          </p>
          
          <ul className="mb-6 space-y-3 pl-6 list-disc text-white/80">
            <li>
              <strong>Unfair value capture</strong>. These intermediaries amass billions of dollars in wealth creation, but pass virtually nothing onto their customers — the everyday people on the ground, whose data drives a meaningful proportion of the global AI economy.
            </li>
            <li>
              <strong>Fees</strong>. AI service providers charge large fees for facilitating computations. These fees often disproportionately impact smaller businesses and individual creators who have the fewest alternatives.
            </li>
            <li>
              <strong>Censorship</strong>. If a particularly trusted intermediary decides that you should not be able to access certain AI resources, it can place restrictions on your usage.
            </li>
            <li>
              <strong>Permissioned</strong>. The trusted intermediary serves as a gatekeeper who can arbitrarily prevent anybody from being part of the network.
            </li>
            <li>
              <strong>Privacy concerns</strong>. At a time when the issue of privacy is gaining greater urgency, these powerful gatekeepers can accidentally disclose — or force you to disclose — more information about yourself than you may want.
            </li>
          </ul>
          
          <p className="mb-6 text-white/80">
            AIIGo's distributed computing network, set to launch in the near future, will be a watershed moment for the democratization of AI. For the first time in history, people will be able to securely contribute computing power and access high-quality AI resources without requiring a centralized third party. Running on AIIGo will mean that people can contribute to and use AI services directly, bypassing institutional fees, obstructions, and intrusions. AIIGo will truly be a computing platform without boundaries, powering and connecting a new global AI economy.
          </p>
        </div>
      )
    },
    {
      id: 'problem',
      title: 'Problem',
      icon: <Shield className="h-5 w-5" />,
      content: (
        <div>
          <h3 className="text-xl font-bold mb-4">Centralization of Power in AI Computing</h3>
          <p className="mb-6 text-white/80">
            In the early days of AI, when only a few companies were working to research and develop foundational models, anyone could get started by simply running models on their personal computer. As AI began to gain in popularity, large tech companies realized that they could earn more profit if they controlled more compute resources.
          </p>
          
          <p className="mb-6 text-white/80">
            As AI continued to increase in value, entire industries began to spring up around it. These companies developed specialized hardware (GPUs, TPUs, ASICs) and constructed huge server farms to run machine learning models. The emergence of these enormous AI corporations drove the AI Gold Rush, making it very difficult for everyday people to contribute to the network and get rewarded. Their efforts also began consuming increasingly large amounts of computing energy, contributing to mounting environmental issues around the world.
          </p>
          
          <p className="mb-6 text-white/80">
            The centralization of production power and wealth in the AI network has made it very difficult and expensive for the average person to participate. If you want to utilize high-performance AI today, your easiest options are to:
          </p>
          
          <ol className="mb-6 space-y-3 pl-6 list-decimal text-white/80">
            <li>
              <strong>Build it yourself</strong> - Just hook up specialized hardware and go to town. Just know that since you'll be competing against massive server farms from across the world, consuming enormous amounts of energy, you won't be able to create much on your own.
            </li>
            <li>
              <strong>Subscribe to AI services</strong> - Today, you can buy AI services from major providers, but the costs are high and constantly increase as your usage grows. You would also be giving up control over your data and privacy.
            </li>
          </ol>
          
          <p className="mb-6 text-white/80">
            AIIGo was designed to address this centralization by creating a distributed computing network where everyday people could contribute to and benefit from AI technologies without the barriers created by the current ecosystem.
          </p>
        </div>
      )
    },
    {
      id: 'solution',
      title: 'Solution',
      icon: <Layers className="h-5 w-5" />,
      content: (
        <div>
          <h3 className="text-xl font-bold mb-4">AIIGo - Enabling Distributed Computing on Everyday Devices</h3>
          <p className="mb-6 text-white/80">
            After identifying key barriers to adoption, the AIIGo Core Team set out to find a way that would allow everyday people to contribute computing resources (or earn rewards for validating computations on a distributed record of transactions).
          </p>
          
          <p className="mb-6 text-white/80">
            One of the major challenges that arises with maintaining a distributed record of computations is ensuring that updates to this open record are not fraudulent. Traditional approaches to this problem often consume massive amounts of energy. For AIIGo, we introduced the additional design requirement of employing a consensus algorithm that would be extremely user-friendly and enable participation on personal computers and mobile phones.
          </p>
          
          <h3 className="text-xl font-bold mb-4">Our Consensus Mechanism</h3>
          <p className="mb-6 text-white/80">
            AIIGo uses an innovative consensus mechanism called Federated Trust Agreements to ensure that updates to the distributed ledger are accurate and trustworthy. This approach is designed to be energy-efficient while still maintaining high security standards.
          </p>
          
          <h3 className="text-xl font-bold mb-4">User Roles in the AIIGo Network</h3>
          <p className="mb-4 text-white/80">There are four roles AIIGo users can play as network contributors:</p>
          
          <ul className="mb-6 space-y-4 pl-6 text-white/80">
            <li>
              <strong className="text-primary">Contributor</strong>: A user of the AIIGo mobile app who is contributing computing resources by providing access to unused CPU/GPU power from their device.
            </li>
            <li>
              <strong className="text-primary">Validator</strong>: A user who is verifying the integrity of computations performed on the network and confirming that they are not fraudulent.
            </li>
            <li>
              <strong className="text-primary">Ambassador</strong>: A user of the AIIGo mobile app who is introducing other users into the AIIGo network.
            </li>
            <li>
              <strong className="text-primary">Node</strong>: A user who is running the AIIGo node software on their desktop or laptop computer, providing more substantial computing resources to the network.
            </li>
          </ul>
          
          <p className="mb-6 text-white/80">
            A user can play more than one of the above roles. All roles are necessary, thus all roles are rewarded with computational credits on a daily basis as long as they participated and contributed during that given day.
          </p>
        </div>
      )
    },
    {
      id: 'tokenomics',
      title: 'Economic Model',
      icon: <Code className="h-5 w-5" />,
      content: (
        <div>
          <h3 className="text-xl font-bold mb-4">Balancing Scarcity and Access</h3>
          <p className="mb-6 text-white/80">
            AIIGo's economic model seeks to strike a balance between creating a sense of scarcity for computational credits, while still ensuring that they do not accumulate into a very small number of hands. We want to make sure our users earn more credits as they make contributions to the network.
          </p>
          
          <h3 className="text-xl font-bold mb-4">The AIIGo Economic Model</h3>
          <p className="mb-4 text-white/80">
            AIIGo's economic model design requirements:
          </p>
          
          <ul className="mb-6 space-y-2 pl-6 list-disc text-white/80">
            <li><strong>Simple</strong>: Build an intuitive and transparent model</li>
            <li><strong>Fair distribution</strong>: Give a critical mass of the world's population access to AIIGo resources</li>
            <li><strong>Scarcity</strong>: Create a sense of scarcity to sustain AIIGo's value over time</li>
            <li><strong>Meritocratic contributions</strong>: Reward contributions to build and sustain the network</li>
          </ul>
          
          <h3 className="text-xl font-bold mb-4">Resource Allocation</h3>
          <p className="mb-6 text-white/80">
            In contrast to traditional systems which created a fixed supply of resources for the entire global population, AIIGo creates a fair allocation of resources for each person that joins the network. For each person that joins the AIIGo Network, a fixed amount of computing credits is made available. This supply is then released over the lifetime of that member based on their level of engagement and contribution to network security.
          </p>
          
          <p className="mb-6 text-white/80">
            While AIIGo seeks to avoid extreme concentrations of resources, the network also rewards earlier members and their contributions with a relatively larger share of computing power. When networks such as AIIGo are in their early days, they tend to provide a lower utility to participants. However, as more people join the network, each participant gets more utility out of the network. In order to reward people that come to the network early, AIIGo's individual contribution rewards decrease as a function of the number of people in the network.
          </p>

          <h3 className="text-xl font-bold mb-4">AIIGo Token Distribution</h3>
          <p className="mb-6 text-white/80">
            The AIIGo token is the native currency of our platform, designed with a balanced distribution model to ensure sustainable growth and fair value distribution. The total token supply is distributed as follows:
          </p>

          <div className="flex flex-col md:flex-row items-center mb-8 gap-8">
            <div className="w-full md:w-1/2 max-w-md mx-auto">
              {/* Chart */}
              <Doughnut 
                data={{
                  labels: ['Computing Power Contribution', 'Team', 'Financing', 'Community'],
                  datasets: [{
                    data: [40, 20, 20, 20],
                    backgroundColor: [
                      'rgba(101, 116, 205, 0.8)',
                      'rgba(149, 76, 233, 0.8)',
                      'rgba(255, 99, 132, 0.8)',
                      'rgba(54, 162, 235, 0.8)'
                    ],
                    borderColor: [
                      'rgba(101, 116, 205, 1)',
                      'rgba(149, 76, 233, 1)',
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1,
                  }]
                }}
                options={{
                  plugins: {
                    legend: {
                      display: true,
                      position: 'bottom',
                      labels: {
                        color: 'rgba(255, 255, 255, 0.8)',
                        font: {
                          size: 12
                        }
                      }
                    },
                    tooltip: {
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      bodyFont: {
                        size: 14
                      },
                      titleFont: {
                        size: 16
                      }
                    }
                  },
                  cutout: '65%'
                }}
              />
            </div>
            <div className="w-full md:w-1/2">
              <div className="space-y-4 text-white/80">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-[rgba(101,116,205,0.8)] mr-3"></div>
                  <div>
                    <p className="font-semibold">Computing Power Contribution (40%)</p>
                    <p className="text-sm">Rewards for users who contribute computing resources to the network</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-[rgba(149,76,233,0.8)] mr-3"></div>
                  <div>
                    <p className="font-semibold">Team (20%)</p>
                    <p className="text-sm">Allocated to the development team for ongoing platform innovation</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-[rgba(255,99,132,0.8)] mr-3"></div>
                  <div>
                    <p className="font-semibold">Financing (20%)</p>
                    <p className="text-sm">Reserved for platform growth, partnerships, and ecosystem expansion</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-[rgba(54,162,235,0.8)] mr-3"></div>
                  <div>
                    <p className="font-semibold">Community (20%)</p>
                    <p className="text-sm">Allocated for community incentives, governance, and ecosystem development</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <p className="mb-6 text-white/80">
            This balanced distribution ensures that the majority of tokens (40%) are dedicated to rewarding active network participants who contribute computing power, while providing essential allocations for development, growth, and community engagement. This model aligns incentives among all stakeholders and supports AIIGo's mission of creating a truly distributed AI computing network.
          </p>
        </div>
      )
    },
    {
      id: 'utility',
      title: 'Utility',
      icon: <Users className="h-5 w-5" />,
      content: (
        <div>
          <h3 className="text-xl font-bold mb-4">Pooling and Monetizing Our Computing Resources</h3>
          <p className="mb-6 text-white/80">
            Today, everyone is sitting on a veritable treasure trove of untapped computing resources. Each of us has devices with processing power that sits idle most of the time, yet could be contributing to solving important problems. While our devices remain underutilized, large corporations monopolize AI capabilities and charge extraordinary prices for access.
          </p>
          
          <p className="mb-6 text-white/80">
            We all know that we can do more together than we can alone. On today's web, massive corporations like Google, Amazon, and Microsoft have immense leverage against individual consumers in the AI market. As a result, they are able to capture the lion's share of value created. AIIGo levels the playing field by allowing its members to pool their collective resources so they can get a share of the value that they create.
          </p>
          
          <h3 className="text-xl font-bold mb-4">The AIIGo Stack – Unleashing Underutilized Resources</h3>
          
          <h4 className="text-lg font-semibold mb-2 mt-4">AIIGo Network and Trust Graph</h4>
          <p className="mb-4 text-white/80">
            One of the biggest challenges in distributed computing is knowing who to trust. AIIGo's consensus algorithm creates a native trust layer that scales trust in the network without intermediaries. Each participant's security verification helps build a global "trust graph" that allows the network to operate securely.
          </p>
          
          <h4 className="text-lg font-semibold mb-2 mt-4">AIIGo's AI Marketplace</h4>
          <p className="mb-4 text-white/80">
            AIIGo allows its members to pool their collective computing resources to create an AI service marketplace much more valuable than any individual's contribution alone. This enables everyone on the network to both contribute to and benefit from advanced AI capabilities that would otherwise be out of reach.
          </p>
          
          <h4 className="text-lg font-semibold mb-2 mt-4">AIIGo's Application Platform</h4>
          <p className="mb-4 text-white/80">
            In addition to contributing computing resources to the AIIGo Network, members will be able to utilize the platform for their own AI applications. This creates a vibrant ecosystem where resources can be shared and exchanged, allowing even those with limited hardware to access powerful AI capabilities.
          </p>
          
          <h4 className="text-lg font-semibold mb-2 mt-4">AIIGo's Developer Network</h4>
          <p className="mb-4 text-white/80">
            AIIGo's shared resources, trust graph, and marketplace will be the foundation for a broader ecosystem of decentralized applications. Today, anyone that wants to start an AI application needs to bootstrap its technical infrastructure and community from scratch. AIIGo's platform will allow developers to leverage existing infrastructure and resources to build innovative new AI applications.
          </p>
        </div>
      )
    },
    {
      id: 'governance',
      title: 'Governance',
      icon: <Shield className="h-5 w-5" />,
      content: (
        <div>
          <h3 className="text-xl font-bold mb-4">AIIGo Governance - For and By the People</h3>
          <p className="mb-6 text-white/80">
            Trust is the foundation of any successful technological system. One of the most important factors engendering trust is governance, or the process by which changes are implemented to the protocol over time.
          </p>
          
          <h3 className="text-xl font-bold mb-4">AIIGo's Governance Model – A Two-Phase Plan</h3>
          <p className="mb-6 text-white/80">
            To build an enduring governance model, AIIGo will pursue a two-phase plan that allows the system to evolve based on the needs of its growing community.
          </p>
          
          <h4 className="text-lg font-semibold mb-2">Provisional Governance Model (&lt; 5M Members)</h4>
          <p className="mb-4 text-white/80">
            Until the network hits a critical mass of 5M members, AIIGo will operate under a provisional governance model. This model will most closely resemble "off-chain" governance models currently employed by protocols like Ethereum, with AIIGo's Core Team playing an important role in guiding the development of the protocol.
          </p>
          <p className="mb-6 text-white/80">
            However, AIIGo's Core Team will still rely heavily on the input of the community. The AIIGo mobile application itself is where the core team solicits community input and engages with Contributors. AIIGo embraces community critiques and suggestions through various feedback channels on the platform.
          </p>
          
          <h4 className="text-lg font-semibold mb-2">AIIGo's "Constitutional Convention" (&gt; 5M Members)</h4>
          <p className="mb-4 text-white/80">
            Upon hitting 5M members, a provisional committee will be formed based on previous contributions to the AIIGo Network. This committee will be responsible for soliciting and proposing suggestions from and to the wider community. It will also organize a series of on- and offline conversations where AIIGo's members will be able to weigh in on AIIGo's long-term constitution.
          </p>
          <p className="mb-4 text-white/80">
            Given AIIGo's global user base, the network will conduct these conventions at multiple locations across the world to ensure accessibility. In addition to hosting in-person conventions, AIIGo will also use its mobile application as a platform for allowing members to participate in the process remotely. Whether in-person or online, AIIGo's community members will have the ability to participate in the crafting of AIIGo's long-term governance structure.
          </p>
        </div>
      )
    },
    {
      id: 'roadmap',
      title: 'Roadmap',
      icon: <Map className="h-5 w-5" />,
      content: (
        <div>
          <h3 className="text-xl font-bold mb-4">AIIGo Development Roadmap</h3>
          
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-2 text-primary">Phase 1 – Design, Distribution, Trust Graph Bootstrap</h4>
            <p className="mb-4 text-white/80">
              The AIIGo server operates as a faucet emulating the behavior of the decentralized system as it will function once live. During this phase, improvements in the user experience and behavior are possible and relatively easy to make compared to the stable phase of the main network. All allocation of resources to users will be migrated to the live network once it launches.
            </p>
          </div>
          
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-2 text-primary">Phase 2 – Testnet</h4>
            <p className="mb-4 text-white/80">
              Before we launch the main network, the Node software will be deployed on a test network. The test network will use the same exact trust graph as the main network but with test computing allocations. AIIGo's core team will host several nodes on the test network but will encourage more Contributors to start their own nodes on the testnet.
            </p>
            <p className="mb-4 text-white/80">
              The test network will be run in parallel to the AIIGo emulator in phase one, and periodically the results from both systems will be compared to catch the gaps and misses of the test network, which will allow AIIGo developers to propose and implement fixes.
            </p>
          </div>
          
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-2 text-primary">Phase 3 – Mainnet</h4>
            <p className="mb-4 text-white/80">
              When the community feels the software is ready for production, and it has been thoroughly tested on the testnet, the official mainnet of the AIIGo network will be launched. An important detail is that, in the transition into the mainnet, only accounts validated to belong to distinct real individuals will be honored.
            </p>
            <p className="mb-4 text-white/80">
              After this point, the faucet and AIIGo network emulator of Phase 1 will be shut down and the system will continue on its own forever. Future updates to the protocol will be contributed by the AIIGo developer community and AIIGo's core team, and will be proposed by the committee.
            </p>
            <p className="mb-4 text-white/80">
              Their implementation and deployment will depend on nodes updating the software just like any other blockchain. No central authority will be controlling the system and it will be fully decentralized. Balances of fake users or duplicate users will be discarded.
            </p>
          </div>
          
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-2 text-primary">Current Status</h4>
            <p className="mb-4 text-white/80">
              AIIGo is currently in Phase 1 of development, with over 1 million contributors already participating in the network. Our team is actively developing the core infrastructure and preparing for the transition to the testnet phase.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="container py-20">
      <div className="section-title text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            AIIGo Whitepaper
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-white/60 mt-4 max-w-2xl mx-auto text-lg"
        >
          A comprehensive overview of the AIIGo network, its technology, and vision for the future of distributed AI computing
        </motion.p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar navigation */}
        <motion.div 
          className="lg:w-1/4 sticky top-24 h-fit"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="glass-card p-6 rounded-2xl border border-white/5">
            <div className="mb-6 flex justify-between items-center">
              <h3 className="font-bold text-xl text-white">Contents</h3>
            </div>
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => {
                      setActiveTab(section.id);
                      toggleSection(section.id);
                      
                      // Scroll to the section when it's selected
                      const element = document.getElementById(section.id);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className={`w-full flex items-center py-2 px-3 rounded-lg transition-colors ${
                      activeTab === section.id
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="mr-2">{section.icon}</span>
                    <span>{section.title}</span>
                    <ChevronRight className={`ml-auto h-4 w-4 transition-transform ${
                      activeTab === section.id ? "rotate-90" : ""
                    }`} />
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-white/10">
              <GradientButton className="w-full justify-center">
                Join AIIGo Network
              </GradientButton>
            </div>
          </div>
        </motion.div>

        {/* Main content */}
        <motion.div 
          className="lg:w-3/4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="glass-card p-8 rounded-2xl border border-white/5">
            {sections.map((section) => (
              <div
                key={section.id}
                id={section.id}
                className={`mb-12 ${activeTab === section.id ? "" : "hidden lg:block"}`}
              >
                <div 
                  className="flex items-center mb-6 cursor-pointer lg:cursor-default"
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="p-2 rounded-lg bg-white/5 mr-3 flex items-center justify-center">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-bold flex items-center my-auto">{section.title}</h2>
                  <ChevronDown className={`ml-auto lg:hidden h-5 w-5 transition-transform ${
                    expandedSections[section.id] ? "rotate-180" : ""
                  }`} />
                </div>
                
                {(expandedSections[section.id] || window.innerWidth >= 1024) && (
                  <div className="prose prose-invert max-w-none">
                    {section.content}
                  </div>
                )}
                
                <div className="border-b border-white/10 mt-12 mb-12 last:border-0 last:mb-0"></div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Whitepaper; 