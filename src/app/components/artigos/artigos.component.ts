import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Subject } from 'rxjs';


export interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: Date;
  readTime: number; // em minutos
  category: string;
  tags: string[];
  imageUrl: string;
  isVisible?: boolean;
}
@Component({
  selector: 'app-artigos',
  templateUrl: './artigos.component.html',
  styleUrls: ['./artigos.component.scss'] // Correto: styleUrls
})
export class ArtigosComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren('articleCard') articleCards!: QueryList<ElementRef>;

  private destroy$ = new Subject<void>();
  private observer!: IntersectionObserver;

  selectedCategory: string = 'todos';
  categories: string[] = ['todos', 'tecnologia', 'design', 'negócios', 'marketing'];
  
  allArticles: Article[] = [
    {
      id: 1,
      title: 'Como a Inteligência Artificial está Revolucionando o Design Digital',
      excerpt: 'Descubra como as ferramentas de IA estão transformando a forma como criamos experiências digitais e qual o futuro do design.',
      content: 'Conteúdo completo do artigo...',
      author: 'Maria Silva',
      publishDate: new Date('2024-03-15'),
      readTime: 8,
      category: 'tecnologia',
      tags: ['AI', 'Design', 'Digital', 'Futuro'],
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
      isVisible: false
    },
    {
      id: 2,
      title: 'Estratégias de UX/UI para E-commerce que Convertem',
      excerpt: 'Aprenda as melhores práticas de design para criar lojas online que realmente vendem e proporcionam excelente experiência.',
      content: 'Conteúdo completo do artigo...',
      author: 'João Santos',
      publishDate: new Date('2024-03-12'),
      readTime: 12,
      category: 'design',
      tags: ['UX', 'UI', 'E-commerce', 'Conversão'],
      imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      isVisible: false
    },
    {
      id: 3,
      title: 'Marketing Digital: Tendências para 2024',
      excerpt: 'Conheça as principais tendências do marketing digital e como sua empresa pode se adaptar ao novo cenário.',
      content: 'Conteúdo completo do artigo...',
      author: 'Ana Costa',
      publishDate: new Date('2024-03-10'),
      readTime: 6,
      category: 'marketing',
      tags: ['Marketing', 'Digital', 'Tendências', '2024'],
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      isVisible: false
    },
    {
      id: 4,
      title: 'Como Construir uma Startup de Sucesso do Zero',
      excerpt: 'Um guia completo com os passos essenciais para transformar sua ideia em um negócio próspero e sustentável.',
      content: 'Conteúdo completo do artigo...',
      author: 'Pedro Lima',
      publishDate: new Date('2024-03-08'),
      readTime: 15,
      category: 'negócios',
      tags: ['Startup', 'Empreendedorismo', 'Negócios', 'Sucesso'],
      imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop',
      isVisible: false
    },
    {
      id: 5,
      title: 'Desenvolvimento Frontend: React vs Angular vs Vue',
      excerpt: 'Uma comparação detalhada entre os principais frameworks frontend para ajudar você a escolher o melhor para seu projeto.',
      content: 'Conteúdo completo do artigo...',
      author: 'Lucas Oliveira',
      publishDate: new Date('2024-03-05'),
      readTime: 10,
      category: 'tecnologia',
      tags: ['React', 'Angular', 'Vue', 'Frontend'],
      imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=400&fit=crop',
      isVisible: false
    },
    {
      id: 6,
      title: 'Design Systems: Como Criar Consistência Visual',
      excerpt: 'Aprenda a criar e implementar um design system eficaz que garanta consistência em todos os produtos da sua empresa.',
      content: 'Conteúdo completo do artigo...',
      author: 'Carla Mendes',
      publishDate: new Date('2024-03-02'),
      readTime: 9,
      category: 'design',
      tags: ['Design System', 'Consistência', 'Branding', 'UI'],
      imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
      isVisible: false
    }
  ];

  filteredArticles: Article[] = [];

  ngOnInit(): void {
    this.filterArticles();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setupIntersectionObserver();
    }, 100);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  filterArticles(): void {
    this.filteredArticles = this.selectedCategory === 'todos' 
      ? [...this.allArticles]
      : this.allArticles.filter(article => article.category === this.selectedCategory);
    
    // Reset visibility para nova animação
    this.filteredArticles.forEach(article => article.isVisible = false);
    
    // Reconfigurar observer após filtro
    setTimeout(() => {
      this.setupIntersectionObserver();
    }, 100);
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.filterArticles();
  }

  private setupIntersectionObserver(): void {
    if (this.observer) {
      this.observer.disconnect();
    }

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const cardIndex = this.getCardIndex(entry.target);
          if (cardIndex !== -1 && !this.filteredArticles[cardIndex].isVisible) {
            setTimeout(() => {
              this.filteredArticles[cardIndex].isVisible = true;
            }, index * 100);
          }
        }
      });
    }, options);

    setTimeout(() => {
      this.articleCards?.forEach(card => {
        this.observer.observe(card.nativeElement);
      });
    }, 50);
  }

  private getCardIndex(target: Element): number {
    return this.articleCards?.toArray().findIndex(card => card.nativeElement === target) ?? -1;
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(date);
  }

  trackByArticleId(index: number, article: Article): number {
    return article.id;
  }

  onReadMore(article: Article): void {
    console.log('Lendo artigo:', article.title);
    // Aqui você pode navegar para a página do artigo ou abrir modal
    // this.router.navigate(['/articles', article.id]);
  }
}