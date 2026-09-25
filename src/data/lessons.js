const q = (
  id,
  question,
  options,
  answer,
  explanation
) => {
  const shuffled = options.map((text, index) => ({
    text,
    isCorrect: index === answer,
  }))

  // Fisher-Yates shuffle
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))

    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return {
    id,
    question,
    options: shuffled.map(item => item.text),
    answer: shuffled.findIndex(item => item.isCorrect),
    explanation,
  }
}

const architecture = (nodes, connections) => ({
  nodes,
  connections,
})

const lessons = [
  {
    id: 'cloud-basics',
    number: 1,
    title: 'Cloud Computing Basics',
    shortTitle: 'Cloud Basics',
    level: 'Beginner',
    duration: '10 min',
    category: 'Foundations',
    description:
      'Understand what cloud computing is, why people use it, and how applications use cloud resources over a network.',

    learningGoals: [
      'Understand the basic idea of cloud computing.',
      'Identify common cloud resources such as compute, storage, databases, and networking.',
      'Understand how users and applications interact with cloud services.',
    ],

    sections: [
      {
        title: 'What is Cloud Computing?',
        content:
          'Cloud computing means using computing resources through a network instead of owning and maintaining every physical machine yourself. These resources can include virtual machines, containers, databases, storage, networking, and many other services. A cloud provider operates the underlying infrastructure and gives users ways to create and manage resources when they need them. In simple words, instead of buying your own complete data center, you can rent computing resources from a cloud provider and use them when your application needs them.',
      },
      {
        title: 'Why Do People Use the Cloud?',
        content:
          'The cloud makes it easier to start applications, store data, deploy software, and increase capacity without first buying physical servers. This can be especially useful for startups and small teams because they can begin with a smaller amount of infrastructure and increase it later. Cloud services can also provide ready-made features such as databases, storage, monitoring, networking, and identity management. However, cloud computing does not remove all technical work. Developers still need to design systems, secure them, monitor them, and maintain their applications.',
      },
      {
        title: 'Think of Cloud as Building Blocks',
        content:
          'A useful beginner mental model is to think of cloud services as building blocks. You might use compute to run an application, storage for files, a database for structured information, and networking to connect everything together. A real application usually combines several of these services. Understanding what each building block does is one of the first steps toward becoming a cloud engineer.',
      },
    ],

    quiz: [
      q(
        'cloud-basics-q1',
        'What is cloud computing?',
        [
          'Using computing resources through a network',
          'Using only a local computer',
          'Building every server yourself',
          'Storing everything on a USB drive',
        ],
        0,
        'Cloud computing provides computing resources through a network instead of requiring you to own all of the physical infrastructure.'
      ),
      q(
        'cloud-basics-q2',
        'Which is an example of a cloud resource?',
        [
          'A virtual machine',
          'A keyboard cable',
          'A printed document',
          'A desktop wallpaper',
        ],
        0,
        'A virtual machine is a computing resource that can be created and managed through a cloud platform.'
      ),
      q(
        'cloud-basics-q3',
        'Why can cloud computing help a startup?',
        [
          'It can provide infrastructure without buying every physical server first',
          'It removes the need to write code',
          'It guarantees an application never fails',
          'It makes networking unnecessary',
        ],
        0,
        'Cloud platforms let teams obtain infrastructure when they need it instead of purchasing and operating all physical hardware themselves.'
      ),
      q(
        'cloud-basics-q4',
        'What does a cloud provider generally do?',
        [
          'Operates infrastructure and offers services customers can use',
          'Writes every customer application',
          'Controls every business decision',
          'Replaces every developer',
        ],
        0,
        'A cloud provider operates infrastructure and exposes services that customers can configure and use.'
      ),
      q(
        'cloud-basics-q5',
        'Which combination could form a simple cloud application?',
        [
          'Compute, storage, database, and networking',
          'Only a monitor and keyboard',
          'Only a text editor',
          'Only a printer',
        ],
        0,
        'Real applications often combine compute, storage, databases, and networking to provide a complete service.'
      ),
    ],

    architecture: architecture(
      [
        {
          id: 'user',
          name: 'User',
          type: 'Client',
          status: 'Healthy',
          position: [-3, 0, 0],
          color: '#a78bfa',
        },
        {
          id: 'cloud',
          name: 'Cloud',
          type: 'Cloud Platform',
          status: 'Healthy',
          position: [0, 0, 0],
          color: '#7c5cff',
        },
        {
          id: 'services',
          name: 'Cloud Services',
          type: 'Services',
          status: 'Healthy',
          position: [3, 0, 0],
          color: '#35c7ff',
        },
      ],
      [
        { from: 'user', to: 'cloud' },
        { from: 'cloud', to: 'services' },
      ]
    ),
  },

  {
    id: 'regions-availability-zones',
    number: 2,
    title: 'Regions & Availability Zones',
    shortTitle: 'Regions & Zones',
    level: 'Beginner',
    duration: '10 min',
    category: 'Foundations',
    description:
      'Learn how cloud infrastructure is organized geographically using regions and availability zones, and why spreading workloads can improve resilience.',

    learningGoals: [
      'Understand what a cloud region represents.',
      'Understand the purpose of availability zones.',
      'Understand why distributing resources across zones can reduce the impact of some failures.',
    ],

    sections: [
      {
        title: 'What is a Region?',
        content:
          'A cloud region is a geographic area where a cloud provider operates infrastructure. Providers create regions in different parts of the world so customers can choose where their applications and data run. Region selection can depend on user location, latency, available services, legal requirements, and business needs. For example, an application serving users in one part of the world may choose a nearby region to reduce network delay.',
      },
      {
        title: 'What is an Availability Zone?',
        content:
          'A region can contain multiple availability zones. An availability zone is a separate infrastructure location designed to provide isolation from problems in another zone. The exact physical design differs between cloud providers, but the important beginner idea is that zones give architects separate places to run resources. Instead of keeping everything in one location, an application can distribute important components.',
      },
      {
        title: 'Why Spread Resources?',
        content:
          'If an application runs in only one location, a problem there can affect the whole application. Running suitable resources across multiple zones can reduce that risk. However, simply having multiple zones does not automatically make a system highly available. The application must be designed to use those zones correctly, and important dependencies such as databases may also need a resilient design.',
      },
    ],

    quiz: [
      q(
        'regions-q1',
        'What is a cloud region?',
        [
          'A geographic area containing cloud infrastructure',
          'A single application process',
          'A database table',
          'A network packet',
        ],
        0,
        'A cloud region is a geographic area where a cloud provider operates infrastructure and services.'
      ),
      q(
        'regions-q2',
        'Why are availability zones useful?',
        [
          'They provide separate locations for running resources',
          'They replace application code',
          'They remove the need for backups',
          'They make every request free',
        ],
        0,
        'Availability zones provide separate infrastructure locations that can be used to reduce the impact of some failures.'
      ),
      q(
        'regions-q3',
        'What can happen if an application runs in only one location?',
        [
          'A problem in that location can affect the application',
          'It automatically becomes distributed',
          'It cannot use a database',
          'It becomes a container',
        ],
        0,
        'A single-location design can create a larger failure impact if that location becomes unavailable.'
      ),
      q(
        'regions-q4',
        'Which factor can influence region selection?',
        [
          'User location and latency',
          'The application logo color',
          'Keyboard brand',
          'Number of editor files',
        ],
        0,
        'User location and network latency are common factors when deciding where an application should run.'
      ),
      q(
        'regions-q5',
        'Does using multiple availability zones automatically make an application highly available?',
        [
          'No, the application must be designed to use the separate zones',
          'Yes, in every case',
          'Only without a database',
          'Yes, even if all resources remain in one zone',
        ],
        0,
        'Multiple zones provide resilience building blocks, but the application must actually use them correctly.'
      ),
    ],

    architecture: architecture(
      [
        {
          id: 'region',
          name: 'Region',
          type: 'Region',
          status: 'Healthy',
          position: [0, 1.5, 0],
          color: '#7c5cff',
        },
        {
          id: 'zone-a',
          name: 'Availability Zone A',
          type: 'Zone',
          status: 'Healthy',
          position: [-2.5, -1, 0],
          color: '#35c7ff',
        },
        {
          id: 'zone-b',
          name: 'Availability Zone B',
          type: 'Zone',
          status: 'Healthy',
          position: [2.5, -1, 0],
          color: '#35c7ff',
        },
      ],
      [
        { from: 'region', to: 'zone-a' },
        { from: 'region', to: 'zone-b' },
      ]
    ),
  },

  {
    id: 'virtual-machines',
    number: 3,
    title: 'Virtual Machines',
    shortTitle: 'Virtual Machines',
    level: 'Beginner',
    duration: '10 min',
    category: 'Compute',
    description:
      'Understand software-defined computers that run operating systems and applications on physical hosts.',

    learningGoals: [
      'Understand what a virtual machine is.',
      'Understand the role of a physical host.',
      'Understand how applications run inside virtual machines.',
    ],

    sections: [
      {
        title: 'What is a Virtual Machine?',
        content:
          'A virtual machine, or VM, is a software-defined computer. It can have its own operating system, allocated CPU, memory, storage, and applications just like a physical computer. The difference is that the VM is created using virtualization software rather than being a separate physical machine. This allows one physical machine to host multiple virtual machines.',
      },
      {
        title: 'Physical Hosts and VMs',
        content:
          'A physical host is the real hardware that provides CPU, memory, storage, and other resources. Virtualization software divides those resources so that multiple VMs can run on the same host. From inside the VM, the environment can feel like a separate computer. This model is one reason cloud providers can offer computing capacity to many customers.',
      },
      {
        title: 'When Are VMs Useful?',
        content:
          'VMs are useful when an application needs a configurable operating-system environment or when developers need more control over the machine. They are common for servers, testing environments, legacy applications, and many cloud workloads. Containers and serverless services can be lighter options for some applications, but VMs remain an important cloud concept.',
      },
    ],

    quiz: [
      q(
        'vm-q1',
        'What is a virtual machine?',
        [
          'A software-defined computer environment',
          'A physical keyboard',
          'A network cable',
          'A database query',
        ],
        0,
        'A VM is a software-defined computing environment that can run an operating system and applications.'
      ),
      q(
        'vm-q2',
        'What can a VM contain?',
        [
          'An operating system and applications',
          'Only images',
          'Only network packets',
          'Only source comments',
        ],
        0,
        'A VM can contain an operating system, applications, libraries, and other software.'
      ),
      q(
        'vm-q3',
        'What is a physical host?',
        [
          'The physical machine providing hardware for virtualized workloads',
          'A virtual database table',
          'A browser tab',
          'A source-code folder',
        ],
        0,
        'The physical host is the real hardware on which virtual machines run.'
      ),
      q(
        'vm-q4',
        'Why is virtualization useful?',
        [
          'Multiple virtual machines can share one physical host',
          'It removes all hardware',
          'It prevents applications from running',
          'It converts databases into files',
        ],
        0,
        'Virtualization allows multiple isolated virtual environments to use the resources of one physical machine.'
      ),
      q(
        'vm-q5',
        'Which resource can be allocated to a VM?',
        [
          'CPU and memory',
          'Only a URL',
          'Only a CSS class',
          'Only a Git branch',
        ],
        0,
        'VMs can be given computing resources such as CPU, memory, storage, and networking.'
      ),
    ],

    architecture: architecture(
      [
        {
          id: 'user',
          name: 'User',
          type: 'Client',
          status: 'Healthy',
          position: [-3, 0, 0],
          color: '#a78bfa',
        },
        {
          id: 'vm',
          name: 'Virtual Machine',
          type: 'Compute',
          status: 'Healthy',
          position: [0, 0, 0],
          color: '#35c7ff',
        },
        {
          id: 'app',
          name: 'Application',
          type: 'Application',
          status: 'Healthy',
          position: [3, 0, 0],
          color: '#6ee7b7',
        },
      ],
      [
        { from: 'user', to: 'vm' },
        { from: 'vm', to: 'app' },
      ]
    ),
  },

  {
    id: 'containers',
    number: 4,
    title: 'Containers',
    shortTitle: 'Containers',
    level: 'Beginner',
    duration: '10 min',
    category: 'Compute',
    description:
      'Learn how containers package applications and dependencies into portable units that run consistently across compatible environments.',

    learningGoals: [
      'Understand what a container packages.',
      'Understand why containers are portable.',
      'Understand the basic difference between containers and VMs.',
    ],

    sections: [
      {
        title: 'What is a Container?',
        content:
          'A container packages an application together with the files, libraries, and configuration it needs to run. This helps make the application environment more predictable. Instead of manually installing the same dependencies on every machine, a team can package the application and deploy the same container image to different compatible environments.',
      },
      {
        title: 'Containers and the Host',
        content:
          'Containers normally share the host operating system kernel instead of carrying a complete guest operating system. This can make containers lighter than traditional virtual machines. Containers are still isolated, but the exact isolation and security depend on the container technology and its configuration.',
      },
      {
        title: 'Why Developers Use Containers',
        content:
          'Containers are useful for repeatable development environments, automated deployments, microservices, testing, and cloud platforms. A developer can build an image, test it, and then run the same image in another environment. This can reduce the common problem of software working on one machine but behaving differently somewhere else.',
      },
    ],

    quiz: [
      q(
        'containers-q1',
        'What does a container usually package?',
        [
          'An application and its dependencies',
          'Only a physical server',
          'Only a network cable',
          'Only a database backup',
        ],
        0,
        'A container packages an application with the files and dependencies it needs to run.'
      ),
      q(
        'containers-q2',
        'Why are containers useful for deployment?',
        [
          'They make application environments more repeatable',
          'They remove the need for software',
          'They guarantee zero bugs',
          'They turn apps into databases',
        ],
        0,
        'A packaged container image can be used to create repeatable application environments.'
      ),
      q(
        'containers-q3',
        'What do containers commonly share with the host?',
        [
          'The host operating-system kernel',
          'The keyboard',
          'The billing account',
          'The source-control repository',
        ],
        0,
        'Typical containers share the host operating-system kernel while isolating application processes.'
      ),
      q(
        'containers-q4',
        'Which comparison is correct?',
        [
          'Containers commonly share the host kernel, while VMs include a guest OS',
          'VMs never use operating systems',
          'Containers always require a full guest OS',
          'They are exactly the same',
        ],
        0,
        'A typical container shares the host kernel, while a virtual machine runs its own guest operating system.'
      ),
      q(
        'containers-q5',
        'What is a container image used for?',
        [
          'A packaged blueprint for creating containers',
          'Storing only passwords',
          'Replacing a router',
          'Measuring CPU temperature',
        ],
        0,
        'A container image contains the packaged application files and configuration used to create containers.'
      ),
    ],

    architecture: architecture(
      [
        {
          id: 'developer',
          name: 'Developer',
          type: 'Client',
          status: 'Healthy',
          position: [-3, 0, 0],
          color: '#a78bfa',
        },
        {
          id: 'container',
          name: 'Container',
          type: 'Container',
          status: 'Healthy',
          position: [0, 0, 0],
          color: '#35c7ff',
        },
        {
          id: 'host',
          name: 'Host',
          type: 'Compute Host',
          status: 'Healthy',
          position: [3, 0, 0],
          color: '#6ee7b7',
        },
      ],
      [
        { from: 'developer', to: 'container' },
        { from: 'container', to: 'host' },
      ]
    ),
  },

  {
    id: 'networking-basics',
    number: 5,
    title: 'Networking Basics',
    shortTitle: 'Networking',
    level: 'Beginner',
    duration: '11 min',
    category: 'Networking',
    description:
      'Understand how clients, networks, routers, and servers communicate and why networking is a foundation of cloud applications.',

    learningGoals: [
      'Understand the basic flow of network traffic.',
      'Understand the role of routers.',
      'Understand how clients communicate with servers.',
    ],

    sections: [
      {
        title: 'How Network Requests Travel',
        content:
          'When a client sends a request to a server, the request travels through network infrastructure. Data is divided into packets and forwarded toward the destination. The application usually does not need to know every physical device involved, but developers still need to understand the basic flow of traffic so they can design and troubleshoot applications.',
      },
      {
        title: 'What Does a Router Do?',
        content:
          'A router connects networks and forwards packets toward their destinations. Routers use addressing and routing information to decide where traffic should go. Cloud networking can have many additional components such as subnets, firewalls, gateways, load balancers, and private networks, but routing is one of the basic ideas behind all of them.',
      },
      {
        title: 'Clients and Servers',
        content:
          'A client starts communication while a server provides a service or resource. A browser is a client when it requests a webpage from a server. In cloud applications, one service can also act as a client when it calls another service through a network. This means modern applications can contain many communicating components.',
      },
    ],

    quiz: [
      q(
        'network-q1',
        'What is one important job of a router?',
        [
          'Forward traffic toward a destination',
          'Store every website permanently',
          'Compile JavaScript',
          'Create database tables',
        ],
        0,
        'Routers forward network packets between networks toward their destinations.'
      ),
      q(
        'network-q2',
        'What is a client?',
        [
          'A system that requests a service',
          'A physical data center',
          'A database index',
          'A billing invoice',
        ],
        0,
        'A client initiates requests for services or resources provided by another system.'
      ),
      q(
        'network-q3',
        'What does a server generally do?',
        [
          'Provides a service or resource to clients',
          'Only displays a keyboard',
          'Always stores images',
          'Only creates cables',
        ],
        0,
        'A server provides services or resources in response to requests.'
      ),
      q(
        'network-q4',
        'What is a network packet?',
        [
          'A unit of data carried across a network',
          'A physical server rack',
          'A database table',
          'A CSS component',
        ],
        0,
        'A network packet is a unit of data transmitted across a network.'
      ),
      q(
        'network-q5',
        'Why is networking important in cloud applications?',
        [
          'Cloud components need to communicate with users and each other',
          'Cloud apps never communicate',
          'Networking is only for printers',
          'Databases do not use networks',
        ],
        0,
        'Cloud applications depend on networking so users, services, databases, and other components can communicate.'
      ),
    ],

    architecture: architecture(
      [
        {
          id: 'user',
          name: 'User',
          type: 'Client',
          status: 'Healthy',
          position: [-4, 0, 0],
          color: '#a78bfa',
        },
        {
          id: 'router',
          name: 'Router',
          type: 'Network',
          status: 'Healthy',
          position: [0, 0, 0],
          color: '#7c5cff',
        },
        {
          id: 'server',
          name: 'Server',
          type: 'Compute',
          status: 'Healthy',
          position: [4, 0, 0],
          color: '#35c7ff',
        },
      ],
      [
        { from: 'user', to: 'router' },
        { from: 'router', to: 'server' },
      ]
    ),
  },

  {
    id: 'load-balancing',
    number: 6,
    title: 'Load Balancing',
    shortTitle: 'Load Balancing',
    level: 'Beginner',
    duration: '11 min',
    category: 'Architecture',
    description:
      'Learn how load balancers distribute incoming traffic across multiple servers to improve performance and resilience.',

    learningGoals: [
      'Understand what a load balancer does.',
      'Understand why multiple servers are useful.',
      'Understand the basic request flow through a load balancer.',
    ],

    sections: [
      {
        title: 'What is a Load Balancer?',
        content:
          'A load balancer sits between users and backend servers and distributes incoming requests across available servers. Instead of every request going to one server, the load balancer can spread traffic across several servers. This helps prevent one server from receiving all the work when multiple servers are available.',
      },
      {
        title: 'Why Use Multiple Servers?',
        content:
          'One server may eventually become too busy to handle all incoming requests. Multiple servers allow the workload to be shared. If one server becomes unhealthy, a well-designed load balancer can stop sending new requests to it while other healthy servers continue handling traffic.',
      },
      {
        title: 'Health Checks',
        content:
          'Load balancers commonly use health checks to determine whether backend servers are responding correctly. A health check might call a simple endpoint such as /health. If a server repeatedly fails the health check, the load balancer can mark it unhealthy and avoid sending normal traffic to it.',
      },
    ],

    quiz: [
      q(
        'lb-q1',
        'What does a load balancer do?',
        [
          'Distributes incoming traffic across servers',
          'Stores all application files',
          'Creates database tables',
          'Replaces the operating system',
        ],
        0,
        'A load balancer distributes incoming requests across available backend servers.'
      ),
      q(
        'lb-q2',
        'Why might an application use multiple servers?',
        [
          'To share the workload',
          'To remove networking',
          'To avoid databases',
          'To stop users from connecting',
        ],
        0,
        'Multiple servers can share incoming work so the application can handle more traffic.'
      ),
      q(
        'lb-q3',
        'What is a health check?',
        [
          'A test used to determine whether a server is responding correctly',
          'A billing calculation',
          'A source-code formatter',
          'A database backup',
        ],
        0,
        'A health check gives infrastructure a way to determine whether a server is healthy enough to receive traffic.'
      ),
      q(
        'lb-q4',
        'What may happen when a backend server becomes unhealthy?',
        [
          'The load balancer can stop sending normal traffic to it',
          'The load balancer sends all users to it',
          'The database is automatically deleted',
          'The network disappears',
        ],
        0,
        'A properly configured load balancer can remove unhealthy servers from the active traffic pool.'
      ),
      q(
        'lb-q5',
        'What problem can load balancing help reduce?',
        [
          'One server receiving all incoming traffic',
          'Developers forgetting JavaScript syntax',
          'Passwords being typed',
          'A website needing HTML',
        ],
        0,
        'Load balancing helps distribute work instead of sending every request to a single server.'
      ),
    ],

    architecture: architecture(
      [
        {
          id: 'users',
          name: 'Users',
          type: 'Clients',
          status: 'Healthy',
          position: [0, 2.5, 0],
          color: '#a78bfa',
        },
        {
          id: 'lb',
          name: 'Load Balancer',
          type: 'Gateway',
          status: 'Healthy',
          position: [0, 0.5, 0],
          color: '#7c5cff',
        },
        {
          id: 'server1',
          name: 'Server 01',
          type: 'Compute',
          status: 'Healthy',
          position: [-2.5, -1.5, 0],
          color: '#35c7ff',
        },
        {
          id: 'server2',
          name: 'Server 02',
          type: 'Compute',
          status: 'Healthy',
          position: [2.5, -1.5, 0],
          color: '#35c7ff',
        },
      ],
      [
        { from: 'users', to: 'lb' },
        { from: 'lb', to: 'server1' },
        { from: 'lb', to: 'server2' },
      ]
    ),
  },

  {
    id: 'auto-scaling',
    number: 7,
    title: 'Auto Scaling',
    shortTitle: 'Auto Scaling',
    level: 'Intermediate',
    duration: '11 min',
    category: 'Architecture',
    description:
      'Understand how cloud systems can automatically add or remove compute capacity as workload changes.',

    learningGoals: [
      'Understand the basic purpose of auto scaling.',
      'Understand scale-out and scale-in.',
      'Understand why scaling policies use metrics.',
    ],

    sections: [
      {
        title: 'What is Auto Scaling?',
        content:
          'Auto scaling means automatically adjusting the amount of computing capacity based on workload or predefined rules. When traffic increases, the system can add more instances. When traffic falls, it can reduce the number of instances. This allows resources to better match demand over time.',
      },
      {
        title: 'Scale Out and Scale In',
        content:
          'Scale out means adding more instances to handle more work. Scale in means removing instances when they are no longer needed. These ideas are different from vertical scaling, where the resources of one machine are increased. Horizontal scaling is especially useful for web applications that can run across multiple instances.',
      },
      {
        title: 'Scaling Metrics',
        content:
          'Auto scaling commonly uses metrics such as CPU utilization, request count, queue length, or custom application metrics. For example, if average CPU remains high for a period of time, a scaling rule could add another server. The exact policy depends on the application and workload.',
      },
    ],

    quiz: [
      q(
        'scale-q1',
        'What is the purpose of auto scaling?',
        [
          'Automatically adjust computing capacity as workload changes',
          'Delete all servers',
          'Replace application code',
          'Store passwords',
        ],
        0,
        'Auto scaling changes the amount of compute capacity so the system can respond to changing demand.'
      ),
      q(
        'scale-q2',
        'What does scale out mean?',
        [
          'Adding more instances',
          'Making one CPU faster',
          'Deleting all servers',
          'Moving a database to a laptop',
        ],
        0,
        'Scale out means adding more instances to share the workload.'
      ),
      q(
        'scale-q3',
        'What does scale in mean?',
        [
          'Removing unneeded instances',
          'Adding more servers',
          'Increasing database rows',
          'Changing the UI',
        ],
        0,
        'Scale in reduces capacity when the workload no longer requires as many instances.'
      ),
      q(
        'scale-q4',
        'Which can be used as a scaling metric?',
        [
          'CPU utilization',
          'Button color',
          'Font family',
          'Logo size',
        ],
        0,
        'CPU utilization is a common metric used to make scaling decisions.'
      ),
      q(
        'scale-q5',
        'Why is horizontal scaling useful for web applications?',
        [
          'Multiple instances can share incoming work',
          'It removes the need for HTTP',
          'It converts servers into databases',
          'It disables networking',
        ],
        0,
        'Horizontal scaling lets an application use multiple instances so incoming work can be shared.'
      ),
    ],

    architecture: architecture(
      [
        {
          id: 'traffic',
          name: 'Incoming Traffic',
          type: 'Metric',
          status: 'Healthy',
          position: [0, 2.5, 0],
          color: '#a78bfa',
        },
        {
          id: 'autoscaler',
          name: 'Auto Scaler',
          type: 'Scaling',
          status: 'Healthy',
          position: [0, 0.5, 0],
          color: '#7c5cff',
        },
        {
          id: 'server1',
          name: 'Server 01',
          type: 'Compute',
          status: 'Healthy',
          position: [-2.5, -1.5, 0],
          color: '#35c7ff',
        },
        {
          id: 'server2',
          name: 'Server 02',
          type: 'Compute',
          status: 'Healthy',
          position: [0, -1.5, 0],
          color: '#35c7ff',
        },
        {
          id: 'server3',
          name: 'Server 03',
          type: 'Compute',
          status: 'Healthy',
          position: [2.5, -1.5, 0],
          color: '#35c7ff',
        },
      ],
      [
        { from: 'traffic', to: 'autoscaler' },
        { from: 'autoscaler', to: 'server1' },
        { from: 'autoscaler', to: 'server2' },
        { from: 'autoscaler', to: 'server3' },
      ]
    ),
  },

  {
    id: 'cloud-storage',
    number: 8,
    title: 'Cloud Storage',
    shortTitle: 'Cloud Storage',
    level: 'Intermediate',
    duration: '10 min',
    category: 'Storage',
    description:
      'Understand how cloud storage is used to keep files and other data available independently from application servers.',

    learningGoals: [
      'Understand what cloud storage is.',
      'Understand why object storage is useful.',
      'Understand the difference between application compute and storage.',
    ],

    sections: [
      {
        title: 'What is Cloud Storage?',
        content:
          'Cloud storage provides a place to store data without tying that data directly to one application server. It can be used for images, videos, documents, backups, logs, and many other types of files. Because the storage is separate from compute, files can remain available even when individual application servers are replaced.',
      },
      {
        title: 'Object Storage',
        content:
          'Object storage stores data as objects, usually consisting of the file itself plus metadata and an identifier. It is commonly used for large collections of files because applications can upload and retrieve objects through APIs. Developers do not need to manage individual disks in the same way they would on a traditional server.',
      },
      {
        title: 'Why Separate Storage from Compute?',
        content:
          'Separating storage from compute makes systems easier to scale and maintain. Application servers can come and go without taking user files with them. For example, a web application might run on multiple servers while all uploaded images are stored in a shared cloud storage service.',
      },
    ],

    quiz: [
      q(
        'storage-q1',
        'What is a common use of cloud storage?',
        [
          'Storing files such as images and documents',
          'Running JavaScript directly',
          'Replacing a network router',
          'Monitoring CPU temperature',
        ],
        0,
        'Cloud storage is commonly used to store files such as images, videos, documents, backups, and logs.'
      ),
      q(
        'storage-q2',
        'Why separate storage from application servers?',
        [
          'Files can remain available even when servers change',
          'It removes networking',
          'It prevents applications from scaling',
          'It makes files disappear faster',
        ],
        0,
        'Separating storage means application servers can be replaced or scaled without losing stored files.'
      ),
      q(
        'storage-q3',
        'What does object storage store?',
        [
          'Objects containing data and metadata',
          'Only CPU instructions',
          'Only network routes',
          'Only login forms',
        ],
        0,
        'Object storage stores objects that usually contain the file data, metadata, and an identifier.'
      ),
      q(
        'storage-q4',
        'Which file could commonly be stored in cloud storage?',
        [
          'A user-uploaded image',
          'A CPU register',
          'A router cable',
          'A keyboard button',
        ],
        0,
        'User-uploaded files such as images are a common cloud storage use case.'
      ),
      q(
        'storage-q5',
        'How can cloud storage help a scalable web application?',
        [
          'Multiple servers can access shared stored files',
          'Only one server can use the files',
          'It disables APIs',
          'It replaces the frontend',
        ],
        0,
        'Shared cloud storage allows multiple application instances to access the same stored files.'
      ),
    ],

    architecture: architecture(
      [
        {
          id: 'app',
          name: 'Application',
          type: 'Compute',
          status: 'Healthy',
          position: [-3, 0, 0],
          color: '#35c7ff',
        },
        {
          id: 'storage',
          name: 'Object Storage',
          type: 'Storage',
          status: 'Healthy',
          position: [0, 0, 0],
          color: '#7c5cff',
        },
        {
          id: 'files',
          name: 'Files',
          type: 'Objects',
          status: 'Healthy',
          position: [3, 0, 0],
          color: '#6ee7b7',
        },
      ],
      [
        { from: 'app', to: 'storage' },
        { from: 'storage', to: 'files' },
      ]
    ),
  },

  {
    id: 'databases',
    number: 9,
    title: 'Databases',
    shortTitle: 'Databases',
    level: 'Intermediate',
    duration: '11 min',
    category: 'Storage & Data',
    description:
      'Understand the role of databases, how applications interact with them, and why persistent data needs a dedicated system.',

    learningGoals: [
      'Understand what a database does.',
      'Understand the difference between application memory and persistent data.',
      'Understand how applications communicate with databases.',
    ],

    sections: [
      {
        title: 'What is a Database?',
        content:
          'A database is a system designed to store, organize, retrieve, and update data. Applications use databases when information needs to remain available beyond the lifetime of one application process. User accounts, product information, orders, messages, and many other types of application data are often stored in databases.',
      },
      {
        title: 'Persistent Data',
        content:
          'Persistent data remains available after an application restarts. This is important because application servers can restart, scale, or be replaced. A database gives the application a dedicated place to keep important information instead of relying only on temporary memory inside a server.',
      },
      {
        title: 'Application to Database Flow',
        content:
          'An application usually sends queries or commands to a database. The database processes those requests and returns results. A good application design also considers authentication, authorization, backups, performance, data validation, and protection against unwanted access.',
      },
    ],

    quiz: [
      q(
        'db-q1',
        'What is a database used for?',
        [
          'Storing and retrieving application data',
          'Rendering CSS',
          'Replacing a monitor',
          'Creating network cables',
        ],
        0,
        'Databases are designed to store, organize, retrieve, and update application data.'
      ),
      q(
        'db-q2',
        'What is persistent data?',
        [
          'Data that remains available after an application restarts',
          'Data that exists only for one second',
          'Data stored only in CSS',
          'Data that can never change',
        ],
        0,
        'Persistent data is stored in a way that allows it to remain available beyond one application process.'
      ),
      q(
        'db-q3',
        'Which could be stored in a database?',
        [
          'User account information',
          'Keyboard color',
          'Monitor brightness',
          'Desk size',
        ],
        0,
        'User account information is a common example of persistent application data.'
      ),
      q(
        'db-q4',
        'How does an application communicate with a database?',
        [
          'Through database queries or commands',
          'By changing CSS colors',
          'By plugging in a keyboard',
          'By editing a logo',
        ],
        0,
        'Applications communicate with databases by sending queries or other database commands.'
      ),
      q(
        'db-q5',
        'Why are backups important for databases?',
        [
          'They can help recover data after certain failures or mistakes',
          'They increase screen brightness',
          'They replace authentication',
          'They remove network traffic',
        ],
        0,
        'Backups provide another copy of important data that can help recovery after failures or accidental changes.'
      ),
    ],

    architecture: architecture(
      [
        {
          id: 'app',
          name: 'Application',
          type: 'Compute',
          status: 'Healthy',
          position: [-3, 0, 0],
          color: '#35c7ff',
        },
        {
          id: 'database',
          name: 'Database',
          type: 'Database',
          status: 'Healthy',
          position: [0, 0, 0],
          color: '#6ee7b7',
        },
        {
          id: 'data',
          name: 'Persistent Data',
          type: 'Data',
          status: 'Healthy',
          position: [3, 0, 0],
          color: '#7c5cff',
        },
      ],
      [
        { from: 'app', to: 'database' },
        { from: 'database', to: 'data' },
      ]
    ),
  },

  {
    id: 'caching',
    number: 10,
    title: 'Caching',
    shortTitle: 'Caching',
    level: 'Intermediate',
    duration: '10 min',
    category: 'Performance',
    description:
      'Learn how caching stores frequently used data closer to where it is needed to reduce repeated work and improve response time.',

    learningGoals: [
      'Understand what a cache does.',
      'Understand why cached data can improve performance.',
      'Understand cache misses and stale data.',
    ],

    sections: [
      {
        title: 'What is a Cache?',
        content:
          'A cache is a faster temporary storage layer that keeps data likely to be requested again. Instead of calculating or retrieving the same information from the main database every time, the application can sometimes read it from the cache. This can reduce database work and improve response times.',
      },
      {
        title: 'Cache Hits and Misses',
        content:
          'A cache hit happens when the requested data is already in the cache. A cache miss happens when the data is not there, so the application must fetch it from another source. After a miss, the application can often store the result in the cache so later requests are faster.',
      },
      {
        title: 'The Problem of Stale Data',
        content:
          'Cached data can become outdated when the original data changes. Developers therefore need rules for when cached data expires or should be removed. Choosing the right expiration time depends on how often the information changes and how important freshness is to the application.',
      },
    ],

    quiz: [
      q(
        'cache-q1',
        'What is a cache?',
        [
          'A fast temporary storage layer for frequently used data',
          'A permanent replacement for every database',
          'A physical router',
          'A code editor',
        ],
        0,
        'A cache temporarily stores frequently requested data so applications can retrieve it faster.'
      ),
      q(
        'cache-q2',
        'What is a cache hit?',
        [
          'The requested data is found in the cache',
          'The database is deleted',
          'The server shuts down',
          'A user opens a browser',
        ],
        0,
        'A cache hit means the requested data was already available in the cache.'
      ),
      q(
        'cache-q3',
        'What is a cache miss?',
        [
          'The requested data is not currently in the cache',
          'The database has perfect data',
          'A server receives no traffic',
          'A user logs out',
        ],
        0,
        'A cache miss occurs when the requested data is not present, so the application must get it elsewhere.'
      ),
      q(
        'cache-q4',
        'Why can caching improve performance?',
        [
          'Frequently requested data can be returned faster',
          'It removes all network communication',
          'It deletes unused servers',
          'It guarantees perfect data',
        ],
        0,
        'Caching can reduce repeated database work and return frequently requested information faster.'
      ),
      q(
        'cache-q5',
        'What is stale data?',
        [
          'Cached information that is no longer up to date',
          'A new database table',
          'A healthy server',
          'A network packet',
        ],
        0,
        'Stale data is cached data that no longer reflects the latest source data.'
      ),
    ],

    architecture: architecture(
      [
        {
          id: 'user',
          name: 'User',
          type: 'Client',
          status: 'Healthy',
          position: [-4, 0, 0],
          color: '#a78bfa',
        },
        {
          id: 'app',
          name: 'Application',
          type: 'Compute',
          status: 'Healthy',
          position: [-1, 0, 0],
          color: '#35c7ff',
        },
        {
          id: 'cache',
          name: 'Cache',
          type: 'Cache',
          status: 'Healthy',
          position: [1.5, 1.2, 0],
          color: '#7c5cff',
        },
        {
          id: 'database',
          name: 'Database',
          type: 'Database',
          status: 'Healthy',
          position: [1.5, -1.2, 0],
          color: '#6ee7b7',
        },
      ],
      [
        { from: 'user', to: 'app' },
        { from: 'app', to: 'cache' },
        { from: 'app', to: 'database' },
      ]
    ),
  },

  {
    id: 'iam-security',
    number: 11,
    title: 'IAM & Cloud Security',
    shortTitle: 'IAM & Security',
    level: 'Intermediate',
    duration: '12 min',
    category: 'Security',
    description:
      'Understand identity, authentication, authorization, permissions, and the basic security principles used in cloud systems.',

    learningGoals: [
      'Understand authentication and authorization.',
      'Understand the purpose of IAM.',
      'Understand why least privilege matters.',
    ],

    sections: [
      {
        title: 'Authentication vs Authorization',
        content:
          'Authentication answers the question “Who are you?” Authorization answers the question “What are you allowed to do?” For example, a user may successfully sign in to an application, but that does not mean the user should be allowed to delete every resource. Keeping these ideas separate helps developers design safer systems.',
      },
      {
        title: 'What is IAM?',
        content:
          'IAM stands for Identity and Access Management. IAM systems control identities and permissions so that users, applications, and services can access the resources they actually need. IAM can be applied to people as well as machine identities used by applications.',
      },
      {
        title: 'Least Privilege',
        content:
          'The principle of least privilege means giving an identity only the permissions it needs to perform its job. For example, an application that only needs to read files should not automatically receive permission to delete every file. Smaller permission sets reduce the potential impact of mistakes or compromised credentials.',
      },
    ],

    quiz: [
      q(
        'iam-q1',
        'What does authentication answer?',
        [
          'Who are you?',
          'How much does the server cost?',
          'Which database is fastest?',
          'How many files exist?',
        ],
        0,
        'Authentication verifies the identity of a user, service, or other entity.'
      ),
      q(
        'iam-q2',
        'What does authorization answer?',
        [
          'What are you allowed to do?',
          'Who created the server?',
          'How long is the password?',
          'Where is the keyboard?',
        ],
        0,
        'Authorization determines which actions or resources an authenticated identity can access.'
      ),
      q(
        'iam-q3',
        'What does IAM stand for?',
        [
          'Identity and Access Management',
          'Internet Application Module',
          'Internal API Monitor',
          'Instance Automation Machine',
        ],
        0,
        'IAM stands for Identity and Access Management.'
      ),
      q(
        'iam-q4',
        'What does least privilege mean?',
        [
          'Give an identity only the permissions it needs',
          'Give every user administrator access',
          'Remove all security controls',
          'Allow every service to access everything',
        ],
        0,
        'Least privilege means limiting permissions to what is necessary for a task.'
      ),
      q(
        'iam-q5',
        'Why should permissions be limited?',
        [
          'To reduce the impact of mistakes or compromised credentials',
          'To make applications slower',
          'To remove databases',
          'To disable monitoring',
        ],
        0,
        'Smaller permission sets reduce what an identity can accidentally or maliciously change.'
      ),
    ],

    architecture: architecture(
      [
        {
          id: 'user',
          name: 'User',
          type: 'Identity',
          status: 'Healthy',
          position: [-3, 0, 0],
          color: '#a78bfa',
        },
        {
          id: 'iam',
          name: 'IAM',
          type: 'Security',
          status: 'Healthy',
          position: [0, 0, 0],
          color: '#7c5cff',
        },
        {
          id: 'resource',
          name: 'Cloud Resource',
          type: 'Resource',
          status: 'Healthy',
          position: [3, 0, 0],
          color: '#35c7ff',
        },
      ],
      [
        { from: 'user', to: 'iam' },
        { from: 'iam', to: 'resource' },
      ]
    ),
  },

  {
    id: 'queues',
    number: 12,
    title: 'Queues & Asynchronous Processing',
    shortTitle: 'Queues',
    level: 'Intermediate',
    duration: '11 min',
    category: 'Architecture',
    description:
      'Learn how queues separate producers from workers and allow systems to process tasks asynchronously.',

    learningGoals: [
      'Understand what a queue does.',
      'Understand producers and consumers.',
      'Understand why asynchronous processing can improve reliability and scalability.',
    ],

    sections: [
      {
        title: 'What is a Queue?',
        content:
          'A queue is a place where messages or tasks wait to be processed. One application can place a task into the queue and another application can process it later. This means the first application does not always need to wait for the entire task to finish before responding to the user.',
      },
      {
        title: 'Producer and Consumer',
        content:
          'The producer creates a message or task and places it into the queue. The consumer, sometimes called a worker, receives tasks from the queue and performs the required work. You can have multiple workers reading from the same queue to process more tasks at the same time.',
      },
      {
        title: 'Why Use Asynchronous Processing?',
        content:
          'Queues are useful when some work takes time or when traffic can arrive in bursts. For example, an application can accept an image upload quickly and place an image-processing task into a queue. Workers can then process the images in the background without making the user wait for every processing step.',
      },
    ],

    quiz: [
      q(
        'queue-q1',
        'What is a queue used for?',
        [
          'Holding tasks or messages until they can be processed',
          'Rendering HTML',
          'Replacing a database permanently',
          'Controlling keyboard input',
        ],
        0,
        'A queue stores tasks or messages temporarily so workers can process them.'
      ),
      q(
        'queue-q2',
        'What is a producer?',
        [
          'The system that places a task into the queue',
          'The system that deletes the queue',
          'A database table',
          'A network cable',
        ],
        0,
        'A producer creates and sends tasks or messages to a queue.'
      ),
      q(
        'queue-q3',
        'What is a consumer or worker?',
        [
          'A system that processes tasks from the queue',
          'A user password',
          'A frontend button',
          'A cloud bill',
        ],
        0,
        'A consumer or worker receives tasks from the queue and performs the required work.'
      ),
      q(
        'queue-q4',
        'Why can asynchronous processing help user experience?',
        [
          'The user may not need to wait for slow background work',
          'It removes every error',
          'It disables databases',
          'It prevents scaling',
        ],
        0,
        'The application can respond before slower background work finishes.'
      ),
      q(
        'queue-q5',
        'Why might an application use multiple workers?',
        [
          'To process multiple queued tasks at the same time',
          'To remove every queue',
          'To disable networking',
          'To store CSS',
        ],
        0,
        'Multiple workers can increase processing capacity by handling several tasks concurrently.'
      ),
    ],

    architecture: architecture(
      [
        {
          id: 'app',
          name: 'Application',
          type: 'Producer',
          status: 'Healthy',
          position: [-3, 0, 0],
          color: '#35c7ff',
        },
        {
          id: 'queue',
          name: 'Queue',
          type: 'Message Queue',
          status: 'Healthy',
          position: [0, 0, 0],
          color: '#7c5cff',
        },
        {
          id: 'worker1',
          name: 'Worker 01',
          type: 'Worker',
          status: 'Healthy',
          position: [2.5, 1.2, 0],
          color: '#6ee7b7',
        },
        {
          id: 'worker2',
          name: 'Worker 02',
          type: 'Worker',
          status: 'Healthy',
          position: [2.5, -1.2, 0],
          color: '#6ee7b7',
        },
      ],
      [
        { from: 'app', to: 'queue' },
        { from: 'queue', to: 'worker1' },
        { from: 'queue', to: 'worker2' },
      ]
    ),
  },

  {
    id: 'microservices',
    number: 13,
    title: 'Microservices',
    shortTitle: 'Microservices',
    level: 'Advanced',
    duration: '12 min',
    category: 'Architecture',
    description:
      'Understand how an application can be split into smaller services with separate responsibilities and APIs.',

    learningGoals: [
      'Understand the idea of microservices.',
      'Understand service boundaries.',
      'Understand some benefits and trade-offs of microservice architecture.',
    ],

    sections: [
      {
        title: 'What Are Microservices?',
        content:
          'Microservices architecture breaks a larger application into smaller services. Each service focuses on a specific responsibility. For example, an e-commerce system might have separate services for users, products, orders, and payments. Each service can communicate with the others through APIs or messaging.',
      },
      {
        title: 'Why Split an Application?',
        content:
          'Smaller services can be developed and deployed independently. A team working on an order service does not necessarily need to deploy the payment service at the same time. Services can also scale separately when one part of the application receives more traffic than another.',
      },
      {
        title: 'The Trade-offs',
        content:
          'Microservices are not automatically better than a single application. More services mean more networking, deployment, monitoring, security, testing, and operational complexity. For small projects, a modular monolith may be simpler. Microservices become useful when the system and team have a real need for separate services.',
      },
    ],

    quiz: [
      q(
        'microservices-q1',
        'What is a microservice?',
        [
          'A small service focused on a specific responsibility',
          'A database backup',
          'A physical server rack',
          'A CSS utility',
        ],
        0,
        'A microservice is a small application service that focuses on a specific responsibility.'
      ),
      q(
        'microservices-q2',
        'Why might a company split an application into services?',
        [
          'Services can be developed and scaled independently',
          'It removes all networking',
          'It guarantees zero bugs',
          'It eliminates monitoring',
        ],
        0,
        'Separate services can be developed, deployed, and scaled independently when the architecture requires it.'
      ),
      q(
        'microservices-q3',
        'How can microservices communicate?',
        [
          'Through APIs or messaging',
          'Only through keyboards',
          'Only through CSS',
          'Only through physical cables controlled manually',
        ],
        0,
        'Microservices commonly communicate through APIs, HTTP, messaging systems, or similar mechanisms.'
      ),
      q(
        'microservices-q4',
        'What is one trade-off of microservices?',
        [
          'They increase operational and networking complexity',
          'They remove all infrastructure',
          'They require no monitoring',
          'They always cost less',
        ],
        0,
        'More services create additional deployment, networking, monitoring, security, and operational work.'
      ),
      q(
        'microservices-q5',
        'When might a simpler monolith be useful?',
        [
          'When the application and team do not need separate services',
          'Only when the app has millions of users',
          'Only when there is no database',
          'Never',
        ],
        0,
        'A modular monolith can be simpler for smaller systems when independent services are not necessary.'
      ),
    ],

    architecture: architecture(
      [
        {
          id: 'gateway',
          name: 'API Gateway',
          type: 'Gateway',
          status: 'Healthy',
          position: [0, 2.5, 0],
          color: '#7c5cff',
        },
        {
          id: 'users',
          name: 'Users Service',
          type: 'Microservice',
          status: 'Healthy',
          position: [-2.5, 0, 0],
          color: '#35c7ff',
        },
        {
          id: 'orders',
          name: 'Orders Service',
          type: 'Microservice',
          status: 'Healthy',
          position: [0, 0, 0],
          color: '#35c7ff',
        },
        {
          id: 'payments',
          name: 'Payments Service',
          type: 'Microservice',
          status: 'Healthy',
          position: [2.5, 0, 0],
          color: '#6ee7b7',
        },
      ],
      [
        { from: 'gateway', to: 'users' },
        { from: 'gateway', to: 'orders' },
        { from: 'gateway', to: 'payments' },
      ]
    ),
  },

  {
    id: 'cloud-costs',
    number: 14,
    title: 'Cloud Cost Basics',
    shortTitle: 'Cloud Costs',
    level: 'Advanced',
    duration: '10 min',
    category: 'FinOps',
    description:
      'Understand how resource usage can affect cloud spending and why cost awareness is an important part of cloud architecture.',

    learningGoals: [
      'Understand what contributes to cloud cost.',
      'Understand why resource usage should be monitored.',
      'Understand why architecture decisions involve cost trade-offs.',
    ],

    sections: [
      {
        title: 'Where Does Cloud Cost Come From?',
        content:
          'Cloud services can charge based on how much of a resource you use, how long it runs, or other service-specific pricing rules. Compute instances, databases, storage, network traffic, and many managed services can all contribute to spending. The exact pricing model depends on the provider and service.',
      },
      {
        title: 'Watch Resource Usage',
        content:
          'Monitoring helps teams understand which resources are being used and how usage changes over time. An unused server that remains running may continue generating cost. Likewise, a resource that is much larger than needed may provide more capacity than the application requires.',
      },
      {
        title: 'Cost is an Architecture Concern',
        content:
          'Cost should be considered alongside performance, reliability, security, and maintainability. A cheaper design is not automatically better if it makes the application unreliable. The goal is to use resources intentionally and understand the trade-offs behind architecture decisions.',
      },
    ],

    quiz: [
      q(
        'cost-q1',
        'What can contribute to cloud cost?',
        [
          'Compute and storage usage',
          'Dashboard color',
          'Keyboard brand',
          'Source-code comments',
        ],
        0,
        'Cloud providers can charge for resource usage such as compute, storage, networking, and managed services.'
      ),
      q(
        'cost-q2',
        'Why should teams monitor cloud resources?',
        [
          'To understand usage and spending',
          'To remove every application',
          'To prevent websites',
          'To replace Git',
        ],
        0,
        'Monitoring helps teams understand which resources are running and how much they are being used.'
      ),
      q(
        'cost-q3',
        'What can happen if an unused resource stays running?',
        [
          'It may continue generating cost',
          'It automatically becomes free',
          'It deletes the application',
          'It becomes a database',
        ],
        0,
        'Depending on the service, a running unused resource can continue generating charges.'
      ),
      q(
        'cost-q4',
        'Should cost be considered together with reliability?',
        [
          'Yes, architecture involves multiple trade-offs',
          'No, reliability never matters',
          'Only for frontend code',
          'Only when there are no users',
        ],
        0,
        'Cloud architecture balances cost with reliability, performance, security, and other requirements.'
      ),
      q(
        'cost-q5',
        'Why can oversized resources be inefficient?',
        [
          'They may provide more capacity than needed',
          'They always improve security',
          'They eliminate monitoring',
          'They prevent scaling',
        ],
        0,
        'Oversized resources can waste capacity and money when the workload does not need that much capacity.'
      ),
    ],

    architecture: architecture(
      [
        {
          id: 'resources',
          name: 'Cloud Resources',
          type: 'Infrastructure',
          status: 'Healthy',
          position: [-2.5, 0, 0],
          color: '#7c5cff',
        },
        {
          id: 'usage',
          name: 'Resource Usage',
          type: 'Metrics',
          status: 'Healthy',
          position: [0, 0, 0],
          color: '#35c7ff',
        },
        {
          id: 'cost',
          name: 'Cloud Cost',
          type: 'Billing',
          status: 'Healthy',
          position: [2.5, 0, 0],
          color: '#6ee7b7',
        },
      ],
      [
        { from: 'resources', to: 'usage' },
        { from: 'usage', to: 'cost' },
      ]
    ),
  },

  {
    id: 'high-availability',
    number: 15,
    title: 'High Availability',
    shortTitle: 'High Availability',
    level: 'Advanced',
    duration: '11 min',
    category: 'Reliability',
    description:
      'Learn how redundancy, failover, and distributed resources can reduce downtime when individual components fail.',

    learningGoals: [
      'Understand redundancy.',
      'Understand failover.',
      'Identify single points of failure.',
    ],

    sections: [
      {
        title: 'What is High Availability?',
        content:
          'High availability means designing a system so it can continue providing its service when some components fail. It is not the same as promising that a system will never fail. Instead, the architecture reduces the effect of failures and provides ways to recover or continue serving users.',
      },
      {
        title: 'Redundancy',
        content:
          'Redundancy means having additional resources that can share or take over work. For example, an application can have multiple server instances instead of relying on one server. Redundancy can exist at many layers including compute, networking, storage, and databases.',
      },
      {
        title: 'Single Points of Failure',
        content:
          'A single point of failure is a component whose failure can cause a major part of the system to stop working. Finding these points is an important architecture exercise. Adding redundancy can reduce some single points of failure, but the overall system still needs monitoring, testing, recovery procedures, and good operational practices.',
      },
    ],

    quiz: [
      q(
        'ha-q1',
        'What does high availability aim to provide?',
        [
          'Continued service when some components fail',
          'Zero bugs',
          'Unlimited storage',
          'Free infrastructure',
        ],
        0,
        'High availability focuses on keeping a service available despite certain component failures.'
      ),
      q(
        'ha-q2',
        'What is redundancy?',
        [
          'Additional resources that can share or take over work',
          'Deleting backups',
          'Using one server',
          'Removing network connections',
        ],
        0,
        'Redundancy provides additional resources that can continue or share work when another resource fails.'
      ),
      q(
        'ha-q3',
        'What is a single point of failure?',
        [
          'A component whose failure can significantly disrupt the system',
          'A successful backup',
          'A healthy server',
          'A monitoring dashboard',
        ],
        0,
        'A single point of failure is a component where one failure can cause significant disruption.'
      ),
      q(
        'ha-q4',
        'What is failover?',
        [
          'Moving work to another available component after a failure',
          'Deleting a server',
          'Changing a logo',
          'Compressing a database',
        ],
        0,
        'Failover moves or redirects work to an available alternative when a component becomes unavailable.'
      ),
      q(
        'ha-q5',
        'Does redundancy guarantee zero downtime?',
        [
          'No, it reduces the impact of certain failures but cannot guarantee perfection',
          'Yes, always',
          'Only with one server',
          'Yes, with a cache',
        ],
        0,
        'Redundancy improves resilience but cannot guarantee that every possible failure will have zero impact.'
      ),
    ],

    architecture: architecture(
      [
        {
          id: 'users',
          name: 'Users',
          type: 'Clients',
          status: 'Healthy',
          position: [0, 2, 0],
          color: '#a78bfa',
        },
        {
          id: 'server-a',
          name: 'Server A',
          type: 'Compute',
          status: 'Healthy',
          position: [-2.5, -1, 0],
          color: '#35c7ff',
        },
        {
          id: 'server-b',
          name: 'Server B',
          type: 'Compute',
          status: 'Healthy',
          position: [2.5, -1, 0],
          color: '#6ee7b7',
        },
      ],
      [
        { from: 'users', to: 'server-a' },
        { from: 'users', to: 'server-b' },
      ]
    ),
  },

  {
    id: 'failure-troubleshooting',
    number: 16,
    title: 'Cloud Failure & Troubleshooting',
    shortTitle: 'Troubleshooting',
    level: 'Advanced',
    duration: '13 min',
    category: 'Operations',
    description:
      'Learn a practical way to investigate cloud failures by starting with symptoms, checking evidence, understanding dependencies, and testing possible causes.',

    learningGoals: [
      'Understand how failures can affect dependent components.',
      'Learn a structured troubleshooting process.',
      'Use logs, metrics, health checks, and recent changes as evidence.',
    ],

    sections: [
      {
        title: 'Start With the Symptom',
        content:
          'Troubleshooting begins with what you can observe. Examples include increased response time, failed requests, high CPU usage, a growing queue, database errors, or an unhealthy server. A symptom tells you what is happening, but it does not automatically tell you why it is happening. Good troubleshooting starts by clearly describing the problem before changing anything.',
      },
      {
        title: 'Follow the Dependencies',
        content:
          'Cloud systems are connected. A frontend may depend on an API, the API may depend on a database, and the API may also depend on a cache or queue. When one component fails, other components may show symptoms too. Looking at these dependencies helps you understand whether the problem is local to one service or part of a larger chain.',
      },
      {
        title: 'Use Evidence',
        content:
          'Useful evidence can include logs, metrics, traces, health checks, error messages, deployment history, and recent configuration changes. Instead of changing many things at once, form a hypothesis and test it. This makes it easier to understand what caused the issue and avoids creating additional problems while troubleshooting.',
      },
      {
        title: 'Recover and Learn',
        content:
          'After restoring service, investigate why the problem happened and whether it could happen again. Teams can improve monitoring, alerts, testing, deployment practices, documentation, or architecture based on what they learned. A good troubleshooting process does not end when the application starts working again; the goal is also to learn from the incident.',
      },
    ],

    quiz: [
      q(
        'troubleshooting-q1',
        'What is a good first troubleshooting step?',
        [
          'Identify and describe the observable symptom',
          'Change every server',
          'Delete the database',
          'Assume one cause without evidence',
        ],
        0,
        'Troubleshooting should begin with observable symptoms so the investigation has a clear starting point.'
      ),
      q(
        'troubleshooting-q2',
        'Which source provides useful evidence?',
        [
          'Logs and metrics',
          'A random color choice',
          'A keyboard model',
          'A social post',
        ],
        0,
        'Logs and metrics provide evidence about what the system was doing around a problem.'
      ),
      q(
        'troubleshooting-q3',
        'Why should you consider dependencies?',
        [
          'A failure in one component can affect components that depend on it',
          'Components never interact',
          'Dependencies only matter for CSS',
          'Every component is completely independent',
        ],
        0,
        'Cloud components often depend on each other, so a failure can create symptoms elsewhere.'
      ),
      q(
        'troubleshooting-q4',
        'Why is changing many things at once risky?',
        [
          'It makes it harder to know which change affected the result',
          'It always fixes the issue',
          'It removes all evidence',
          'It improves every metric',
        ],
        0,
        'Changing many variables at once makes it difficult to identify what caused an improvement or made the problem worse.'
      ),
      q(
        'troubleshooting-q5',
        'What should happen after a serious incident is resolved?',
        [
          'Review the cause and improve the system where appropriate',
          'Forget it immediately',
          'Delete monitoring',
          'Remove backups',
        ],
        0,
        'A post-incident review can reveal improvements for monitoring, testing, architecture, deployment, and documentation.'
      ),
    ],

    architecture: architecture(
      [
        {
          id: 'user',
          name: 'Users',
          type: 'Clients',
          status: 'Healthy',
          position: [0, 2.5, 0],
          color: '#a78bfa',
        },
        {
          id: 'lb',
          name: 'Load Balancer',
          type: 'Gateway',
          status: 'Healthy',
          position: [0, 0.7, 0],
          color: '#7c5cff',
        },
        {
          id: 'server-1',
          name: 'Server 01',
          type: 'Compute',
          status: 'Healthy',
          position: [-2.5, -1.5, 0],
          color: '#35c7ff',
        },
        {
          id: 'server-2',
          name: 'Server 02',
          type: 'Compute',
          status: 'Healthy',
          position: [2.5, -1.5, 0],
          color: '#f59e0b',
        },
        {
          id: 'database',
          name: 'Database',
          type: 'Database',
          status: 'Healthy',
          position: [0, -3, 0],
          color: '#6ee7b7',
        },
      ],
      [
        { from: 'user', to: 'lb' },
        { from: 'lb', to: 'server-1' },
        { from: 'lb', to: 'server-2' },
        { from: 'server-1', to: 'database' },
        { from: 'server-2', to: 'database' },
      ]
    ),
  },
]

export default lessons