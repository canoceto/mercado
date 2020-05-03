package market.com.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Producto.
 */
@Entity
@Table(name = "producto")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Producto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "producto")
    private String producto;

    @Column(name = "precio")
    private Long precio;

    @Column(name = "descripcion")
    private String descripcion;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProducto() {
        return producto;
    }

    public Producto producto(String producto) {
        this.producto = producto;
        return this;
    }

    public void setProducto(String producto) {
        this.producto = producto;
    }

    public Long getPrecio() {
        return precio;
    }

    public Producto precio(Long precio) {
        this.precio = precio;
        return this;
    }

    public void setPrecio(Long precio) {
        this.precio = precio;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Producto descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Producto)) {
            return false;
        }
        return id != null && id.equals(((Producto) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Producto{" +
            "id=" + getId() +
            ", producto='" + getProducto() + "'" +
            ", precio=" + getPrecio() +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}
