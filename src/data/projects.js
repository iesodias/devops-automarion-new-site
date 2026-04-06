export const projects = [
  {
    id: 'devops-automation',
    slug: 'devops-automation-lab',
    title: 'DevOps Automation Lab',
    description: 'Laboratório completo de automação DevOps com Terraform, Ansible e GitHub Actions para provisionamento de infraestrutura na Azure.',
    shortDescription: 'Automação de infraestrutura Azure com IaC e CI/CD.',
    technologies: ['Terraform', 'Ansible', 'Azure', 'GitHub Actions', 'Docker'],
    github: 'https://github.com/iesodias/devops-automation-new',
    demo: null,
    featured: true,
    highlights: [
      'Provisionamento automático de VM na Azure',
      'Pipeline CI/CD com GitHub Actions',
      'Configuração automatizada com Ansible',
      'State management com Azure Storage Backend',
    ],
  },
  {
    id: 'tech-challenge',
    slug: 'tech-challenge-cloud-labs',
    title: 'Tech Challenge — Labs Práticos de Cloud',
    description: 'Repositório open source com labs práticos e passo a passo para aprender AWS e Azure. Inclui 8 labs organizados por nível, materiais de estudo e quizzes interativos via GitHub Issues.',
    shortDescription: 'Labs práticos de AWS e Azure — do básico ao intermediário.',
    technologies: ['AWS', 'Azure', 'S3', 'IAM', 'EC2', 'CLI', 'Storage Account', 'Virtual Machine'],
    github: 'https://github.com/iesodias/tech-challenge',
    demo: null,
    featured: true,
    highlights: [
      '8 labs passo a passo (AWS + Azure)',
      '8 quizzes interativos via GitHub Issues',
      'Material de estudo complementar por lab',
      'Do nível básico ao intermediário',
      'Limpeza de recursos para evitar custos',
      'Open source (MIT)',
    ],
    labs: {
      aws: {
        basico: [
          { title: 'Criar um Bucket S3', url: 'https://github.com/iesodias/tech-challenge/tree/main/labs/aws/basico/01-criando-s3-bucket' },
          { title: 'Criar Usuário e Grupo IAM', url: 'https://github.com/iesodias/tech-challenge/tree/main/labs/aws/basico/02-criando-iam-user-e-grupo' },
          { title: 'Instalar e Configurar AWS CLI', url: 'https://github.com/iesodias/tech-challenge/tree/main/labs/aws/basico/03-instalando-aws-cli' },
        ],
        intermediario: [
          { title: 'Provisionar Instância EC2', url: 'https://github.com/iesodias/tech-challenge/tree/main/labs/aws/intermediario/01-provisionando-ec2' },
        ],
      },
      azure: {
        basico: [
          { title: 'Criar Resource Group', url: 'https://github.com/iesodias/tech-challenge/tree/main/labs/azure/basico/01-criando-resource-group' },
          { title: 'Criar Storage Account', url: 'https://github.com/iesodias/tech-challenge/tree/main/labs/azure/basico/02-criando-storage-account' },
          { title: 'Instalar e Configurar Azure CLI', url: 'https://github.com/iesodias/tech-challenge/tree/main/labs/azure/basico/03-instalando-azure-cli' },
        ],
        intermediario: [
          { title: 'Criar Virtual Machine', url: 'https://github.com/iesodias/tech-challenge/tree/main/labs/azure/intermediario/01-criando-virtual-machine' },
        ],
      },
    },
  },
]
